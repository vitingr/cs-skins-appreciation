<script lang="ts">
  export let skin;

  function formatCurrency(value: number) {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }
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
  <article class="rounded-b-md h-full flex flex-col p-4 bg-white">
    <span class="text-neutral-500 text-xl lg:text-2xl font-semibold"
      >{formatCurrency(skin?.pricelatest || 0)}</span
    >
    <h2 class="mt-2 text-xl font-semibold">{skin?.marketname || ""}</h2>
    <p class="text-neutral-500 h-full">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis sit
      tenetur doloribus iste eius alias odio provident itaque autem at.
    </p>
    {#if skin?.itemgroup === "graffiti"}
      <p
        class="mt-6 text-sm lg:text-base text-center justify-center flex items-center rounded-sm py-1.5 px-4 bg-red-100"
      >
        Baixas chances de valorização
      </p>
    {:else if skin?.appreciationChance >= 20 || skin?.itemgroup === "container"}
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
