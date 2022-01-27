<script>
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let autofocus = false;

  let name = "";
  let nameEl;

  console.log("initializing: ", nameEl);
  onMount(() => autofocus && nameEl.focus());

  const addTodo = () => {
    dispatch("addTodo", name);
    name = "";
    nameEl.focus();
  };

  const onCancel = () => {
    name = "";
    nameEl.focus();
  };
</script>

<form
  on:submit|preventDefault={addTodo}
  on:keydown={(e) => e.key === "Escape" && onCancel()}
>
  <h2 class="label-wrapper">
    <label for="todo-0" class="label__lg"> What needs to be done? </label>
  </h2>
  <input
    type="text"
    bind:value={name}
    id="todo-0"
    autocomplete="off"
    class="input input__lg"
    bind:this={nameEl}
  />
  <button type="submit" disabled={!name} class="btn btn__primary btn__lg"
    >Add</button
  >
</form>
