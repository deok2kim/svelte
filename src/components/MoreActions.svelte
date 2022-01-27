<script>
  import { createEventDispatcher } from "svelte";
  import Todos from "./Todos.svelte";
  const dispatch = createEventDispatcher();

  let completed = true;
  export let todos;

  const checkAll = () => {
    dispatch("checkAll", completed);
    completed = !completed;
  };

  const removeCompleted = () => {
    dispatch("removeCompleted");
  };

  $: completedTodos = todos.filter((t) => t.completed);
</script>

<div class="btn-group">
  <button
    type="button"
    class="btn btn__primary"
    on:click={checkAll}
    disabled={todos.length === 0}>{completed ? "Check" : "Uncheck"} all</button
  >
  <button
    type="button"
    class="btn btn__primary"
    on:click={removeCompleted}
    disabled={completedTodos.length === 0}>Remove completed</button
  >
</div>
