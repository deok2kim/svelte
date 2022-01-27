<script>
  import { tick } from "svelte";
  import { createEventDispatcher } from "svelte";
  import { selectOnFocus } from "../actions";
  export let todo;

  const dispatch = createEventDispatcher();

  let editing = false;
  let name = todo.name;
  let nameEl;

  let editButtonPressed = false;

  function update(updatedTodo) {
    todo = { ...todo, ...updatedTodo };
    dispatch("update", todo);
  }

  function onCancel() {
    name = todo.name;
    editing = false;
  }

  function onSave() {
    update({ name: name });
    editing = false;
  }

  function onRemove() {
    dispatch("remove", todo);
  }

  function onEdit() {
    editButtonPressed = true;
    editing = true;
  }

  function onToggle() {
    update({ completed: !todo.completed });
  }

  // function selectOnFocus(node) {
  //   if (node && typeof node.select === "function") {
  //     const onFocus = (event) => node.select();
  //     node.addEventListener("focus", onFocus);
  //     return {
  //       destroy: () => node.removeEventListener("focus", onFocus),
  //     };
  //   }
  // }
  const focusOnInit = (node) =>
    node && typeof node.focus === "function" && node.focus();
  const focusEditButton = (node) => editButtonPressed && node.focus();
</script>

<div class="stack-small">
  {#if editing}
    <!-- markup for editing todo: label, input text, Cancel and Save Button -->
    <form
      on:submit|preventDefault={onSave}
      class="stack-small"
      on:keydown={(e) => e.key === "Escape" && onCancel()}
    >
      <div class="form-group">
        <label for="todo-{todo.id}" class="todo-label"
          >New name for '{todo.name}'</label
        >
        <input
          bind:value={name}
          type="text"
          id="todo-{todo.id}"
          autoComplete="off"
          class="todo-text"
          bind:this={nameEl}
          use:selectOnFocus
          use:focusOnInit
        />
      </div>
      <div class="btn-group">
        <button class="btn todo-cancel" on:click={onCancel} type="button">
          Cancel<span class="visually-hidden">renaming {todo.name}</span>
        </button>
        <button
          class="btn btn__primary todo-edit"
          type="submit"
          disabled={!name}
        >
          Save<span class="visually-hidden">new name for {todo.name}</span>
        </button>
      </div>
    </form>
  {:else}
    <!-- markup for displaying todo: checkbox, label, Edit and Delete Button -->
    <div class="c-cb">
      <input
        type="checkbox"
        id="todo-{todo.id}"
        on:click={onToggle}
        checked={todo.completed}
      />
      <label for="todo-{todo.id}" class="todo-label">{todo.name}</label>
    </div>
    <div class="btn-group">
      <button type="button" class="btn" on:click={onEdit} use:focusEditButton>
        Edit<span class="visually-hidden"> {todo.name}</span>
      </button>
      <button type="button" class="btn btn__danger" on:click={onRemove}>
        Delete<span class="visually-hidden"> {todo.name}</span>
      </button>
    </div>
  {/if}
</div>
