<script>
  // @ts-nocheck

  import SkinCard from "../components/SkinCard/SkinCard.svelte";
  import { RARITY_ADAPTER } from "../constants/calculator/rarity";

  import { api } from "../constants/instances/api";
  import { calculator } from "../constants/instances/calculator";

  let userId = "";
  let inventoryItems = null;
  let isLoading = false;

  const fetchInvetoryItems = async () => {
    if (!userId) return;
    isLoading = true;
    inventoryItems = null;

    try {
      const response = await api.getUserInventoryItems({ userId });

      if (!Array.isArray(response)) {
        throw new Error("Resposta inválida da API.");
      }

      const maxMarketQuantity = Math.max(
        ...response.map((item) => item.buyordervolume ?? item.offervolume ?? 0),
      );

      inventoryItems = response.map((item) => {
        const chance = calculator.calculateAppreciationChance({
          currentPrice: item.pricereal ?? item.priceavg,
          marketQuantity: item.buyordervolume ?? item.offervolume,
          maxCategoryPrice: item.pricemax ?? 1,
          maxMarketQuantity,
          rarity: RARITY_ADAPTER[item.rarity],
          specialAttributes: [
            item.isstattrak ? 1 : 0,
            item.isstar ? 1 : 0,
            item.issouvenir ? 1 : 0,
          ],
          type: item?.tag2 !== null ? item?.tag2?.toLowerCase() : "",
        });

        console.log(`${item.marketname} ~ ${chance}% de valorizar`);

        return { ...item, appreciationChance: chance };
      });
    } catch (err) {
      console.error("Erro ao buscar inventário", err);
    } finally {
      isLoading = false;
    }
  };
</script>

<section class="py-12 lg:py-16 px-4 w-full">
  <header
    class="max-w-2xl lg:max-w-7xl w-full mx-auto flex flex-col items-center gap-12 lg:gap-16"
  >
    <article class="flex gap-2 items-center flex-col">
      <h1 class="text-4xl text-center font-semibold">Busca de Inventário</h1>
      <p class="text-neutral-600 text-center">
        Digite o ID da steam abaixo para saber se sua skin possui chances de
        valorizar <br /> nos próximos meses
      </p>
    </article>
    <div class="flex flex-col gap-6 items-center max-w-xl w-full mx-auto">
      <input
        class="border w-full bg-white shadow focus:outline-0 outline-0 border-neutral-300 focus:border-indigo-500 transition-all duration-300 ease-in-out rounded-xl px-6 py-3"
        type="text"
        placeholder="Digite o Steam ID"
        bind:value={userId}
        on:keypress={(e) => e.key === "Enter" && fetchInvetoryItems()}
      />
      <a
        class="text-sm font-medium text-indigo-500 hover:brightness-105 -mt-3 transition-all duration-300"
        target="_blank"
        href="https://www.steamidfinder.com/"
        >Não sabe seu ID da steam? clique aqui!</a
      >
      <button on:click={fetchInvetoryItems}
        >Buscar Inventário
        <div class="icon">
          <svg
            height="24"
            width="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </button>
    </div>
    <div class="">
      {#if isLoading}
        <p class="text-center mt-8">Carregando inventário...</p>
      {:else if inventoryItems && inventoryItems.length > 0}
        <section
          class="grid grid-cols-1 h-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch gap-6 mt-12 max-w-7xl mx-auto px-4"
        >
          {#each inventoryItems as item, index (index)}
            <SkinCard skin={item} />
          {/each}
        </section>
      {:else if inventoryItems !== null}
        <p class="text-center mt-8 text-neutral-500">Nenhum item encontrado.</p>
      {/if}
    </div>
  </header>
</section>

<style>
  button {
    margin-top: 12px;
    background: #6366f1;
    color: white;
    font-family: inherit;
    padding: 0.35em;
    padding-left: 2em;
    font-size: 17px;
    font-weight: 500;
    border-radius: 0.9em;
    border: none;
    letter-spacing: 0.05em;
    display: flex;
    align-items: center;
    box-shadow: inset 0 0 1.6em -0.6em #6366f1;
    overflow: hidden;
    position: relative;
    height: 2.8em;
    padding-right: 4.2em;
    cursor: pointer;
  }

  button .icon {
    background: white;
    margin-left: 1em;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.2em;
    width: 2.2em;
    border-radius: 0.7em;
    box-shadow: 0.1em 0.1em 0.6em 0.2em #7b52b9;
    right: 0.3em;
    transition: all 0.3s;
  }

  button:hover .icon {
    width: calc(100% - 0.6em);
  }

  button .icon svg {
    width: 1.1em;
    transition: transform 0.3s;
    color: #7b52b9;
  }

  button:hover .icon svg {
    transform: translateX(0.1em);
  }

  button:active .icon {
    transform: scale(0.95);
  }
</style>
