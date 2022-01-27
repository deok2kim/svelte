<script>
  import Todos from "./components/Todos.svelte";
  import Alert from "./components/Alert.svelte";

  import { todos } from "./stores";
</script>

<main>
  <Alert />
  <Todos bind:todos={$todos} />
</main>

<style>
</style>
