<script lang="ts">
  export let skin;
</script>

<div
  class="border h-full border-neutral-400 bg-white rounded-md flex flex-col gap-4"
>
  <figure
    class="rounded-t-md p-4 flex items-center justify-center bg-neutral-300 w-full h-[260px]"
  >
    <img
      src={skin?.image || ""}
      alt={skin?.marketname || ""}
      class="w-full h-full object-contain"
    />
  </figure>
  <article class="rounded-b-md flex flex-col px-4 py-6 bg-white">
    <h2 class="text-xl font-semibold">{skin?.marketname || ""}</h2>
    <p class="text-neutral-500">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis sit
      tenetur doloribus iste eius alias odio provident itaque autem at.
    </p>
    {skin?.appreciationChance && skin?.appreciationChance >= 30 ? "sim" : "não"}
  </article>
</div>

<style></style>
