<script lang="ts">
  export let skin;
</script>

<div
  class="border h-full border-neutral-400 bg-white rounded-md flex flex-col gap-4"
>
  <figure
    class="rounded-t-md p-4 flex items-center justify-center bg-neutral-300 w-full min-h-[260px]"
  >
    <img
      src={skin?.image || ""}
      alt={skin?.marketname || ""}
      class="w-full h-full object-contain"
    />
  </figure>
  <article class="rounded-b-md h-full flex flex-col px-4 py-6 bg-white">
    <h2 class="text-xl font-semibold">{skin?.marketname || ""}</h2>
    <p class="text-neutral-500 h-full">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis sit
      tenetur doloribus iste eius alias odio provident itaque autem at.
    </p>
    {#if skin?.appreciationChance >= 20}
      <p
        class="mt-6 text-sm lg:text-base text-center justify-center flex items-center rounded-sm py-1.5 px-4 bg-green-100"
      >
        Altas chances de valorizar
      </p>
    {:else if skin?.appreciationChance >= 15}
      <p
        class="mt-6 text-sm lg:text-base text-center justify-center flex items-center rounded-sm py-1.5 px-4 bg-yellow-100"
      >
        Chance de valorização
      </p>
    {:else if skin?.appreciationChance !== undefined}
      <p
        class="mt-6 text-sm lg:text-base text-center justify-center flex items-center rounded-sm py-1.5 px-4 bg-red-100"
      >
        Baixas chances de valorização
      </p>
    {/if}
  </article>
</div>

<style></style>
