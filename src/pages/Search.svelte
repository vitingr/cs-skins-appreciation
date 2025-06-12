<script>
  // @ts-nocheck

  import SkinCard from "../components/SkinCard/SkinCard.svelte";
  import { RARITY_ADAPTER } from "../constants/calculator/rarity";

  import { api } from "../constants/instances/api";
  import { calculator } from "../constants/instances/calculator";
  import { OPTIONS_DATA } from "../constants/pricing";
  // import { MOCK } from "../constants/mock";

  let userId = "";
  let inventoryItems = null;
  let isLoading = false;

  function formatCurrency(value) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  const fetchInvetoryItems = async () => {
    if (!userId) return;
    isLoading = true;
    inventoryItems = null;

    try {
      // const response = MOCK

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
      <button class="button" on:click={fetchInvetoryItems}
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

      {#if inventoryItems === null || inventoryItems?.length <= 0}
        <section class="px-4 w-full pt-12 pb-4 lg:pb-0 lg:pt-20">
          <div
            class="mx-auto flex w-full max-w-2xl flex-col items-center gap-8 lg:max-w-7xl lg:gap-16"
          >
            <article class="flex flex-col items-center gap-2">
              <h2
                class="text-left text-2xl font-semibold lg:text-center lg:text-3xl"
              >
                Escolha o plano ideal para turbinar suas skins
              </h2>
              <p
                class="text-left text-sm text-neutral-600 lg:text-center lg:text-base"
              >
                Tenha acesso a análises precisas, previsões de valorização e
                ferramentas exclusivas que ajudam você <br class="lg:block hidden" /> a tomar decisões mais
                inteligentes no mercado de skins.
              </p>
            </article>
            <ul
              class="mx-auto flex h-full w-full flex-col gap-6 lg:max-w-7xl lg:flex-row lg:items-stretch lg:justify-between lg:gap-12 lg:self-stretch"
            >
              <li
                class="rouded-sm flex w-full flex-col gap-4 bg-white lg:gap-6"
              >
                <hr
                  class={`h-4 w-full rounded-t-sm bg-gradient-to-r from-purple-600 to-purple-300 border-0`}
                />
                <article class="flex flex-col items-center gap-2 px-4">
                  <span
                    class="w-fit rounded-full bg-purple-50 px-2 py-1 text-center text-xs font-medium uppercase text-purple-500"
                  >
                    Plano Grátis
                  </span>
                  <p class="text-center text-2xl lg:text-3xl">
                    {formatCurrency(0)}/mês
                  </p>
                  <p class="text-center text-xs text-neutral-600 lg:text-sm">
                    Plano Gratuíto
                  </p>
                </article>
                <ul
                  class="ml-4 flex list-disc flex-col gap-2 px-4 pb-4 lg:pb-6"
                >
                  {#each OPTIONS_DATA.free as option, index}
                    <li class="text-sm">
                      {option}
                    </li>
                  {/each}
                </ul>
                <div class="flex h-full items-end px-4 pb-4 lg:pb-6">
                  <button
                    class="min-w-full cursor-pointer md:text-sm bg-neutral-800 px-6 py-2.5 hover:brightness-110 transition-all duration-300 rounded-xl flex items-center justify-center text-white"
                    variant="primaryOutline"
                  >
                    Assinar agora
                  </button>
                </div>
              </li>
              <li
                class="rouded-sm flex w-full flex-col gap-4 bg-white lg:gap-6"
              >
                <hr
                  class={`h-4 w-full rounded-t-sm bg-gradient-to-r from-amber-600 to-amber-400 border-0`}
                />
                <article class="flex flex-col items-center gap-2 px-4">
                  <span
                    class="w-fit rounded-full bg-amber-50 px-2 py-1 text-center text-xs font-medium uppercase text-yellow-700"
                  >
                    Plano Básico
                  </span>
                  <p class="text-center text-2xl lg:text-3xl">
                    {formatCurrency(19.99)}/mês
                  </p>
                  <p class="text-center text-xs text-neutral-600 lg:text-sm">
                    Plano Gratuíto
                  </p>
                </article>
                <ul class="ml-4 flex list-disc flex-col gap-2 px-4">
                  {#each OPTIONS_DATA.basic as option, index}
                    <li class="text-sm">
                      {option}
                    </li>
                  {/each}
                </ul>
                <div class="flex h-full items-end px-4 pb-4 lg:pb-6">
                  <button
                    class="min-w-full cursor-pointer md:text-sm bg-neutral-800 px-6 py-2.5 hover:brightness-110 transition-all duration-300 rounded-xl flex items-center justify-center text-white"
                    variant="primaryOutline"
                  >
                    Assinar agora
                  </button>
                </div>
              </li>
              <li
                class="rouded-sm flex w-full flex-col gap-4 bg-white lg:gap-6"
              >
                <hr
                  class={`h-8 w-full rounded-t-sm bg-gradient-to-r from-neutral-800 to-neutral-500 border-0`}
                />
                <article class="flex flex-col items-center gap-2 px-4">
                  <span
                    class="w-fit rounded-full bg-neutral-50 px-2 py-1 text-center text-xs font-medium uppercase text-neutral-700"
                  >
                    Plano Premium
                  </span>
                  <p class="text-center text-2xl lg:text-3xl">
                    {formatCurrency(39.99)}/mês
                  </p>
                  <p class="text-center text-xs text-neutral-600 lg:text-sm">
                    Plano Premium
                  </p>
                </article>
                <ul class="ml-4 flex list-disc flex-col gap-2 px-4">
                  {#each OPTIONS_DATA.premium as option, index}
                    <li class="text-sm">
                      {option}
                    </li>
                  {/each}
                </ul>
                <div class="flex h-full items-end px-4 pb-4 lg:pb-6">
                  <button
                    class="min-w-full cursor-pointer md:text-sm bg-neutral-800 px-6 py-2.5 hover:brightness-110 transition-all duration-300 rounded-xl flex items-center justify-center text-white"
                    variant="primaryOutline"
                  >
                    Assinar agora
                  </button>
                </div>
              </li>
            </ul>
            <p class="mx-auto -mt-4 text-xs text-neutral-500">
              * Valores sujeitos a alteração de preço
            </p>
          </div>
        </section>
        <section class="bg-neutral-100 px-4 py-12 lg:py-20">
          <div
            class="mx-auto flex w-full max-w-2xl flex-col gap-12 lg:max-w-7xl lg:gap-8"
          >
            <article class="flex w-full items-end justify-between gap-4">
              <h2 class="w-full flex-1 text-2xl font-semibold">
                Skins em Alta
              </h2>
              <p class="w-auto text-base">Ver todas</p>
            </article>
            <div
              class="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              <div
                class="flex w-full cursor-pointer items-center gap-4 overflow-hidden lg:gap-8"
              >
                <figure
                  class="group p-3 bg-white flex items-center justify-center h-[125px] w-[125px] overflow-hidden rounded-xl sm:h-[150px] sm:w-[150px] lg:h-[170px] lg:w-[170px]"
                >
                  <img
                    alt="M4A4"
                    class="h-[125px] w-[125px] rounded-xl object-contain transition-all duration-300 group-hover:scale-[1.01] sm:h-[150px] sm:w-[150px] lg:h-[170px] lg:w-[170px]"
                    src="https://community.fastly.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhjxszFJTwW08izmZWAluLLP7LWnn8f68R33L-S8I_xjFCx-0VvNmvwco6Xc1VqMA7Y_gK5wL_s05HovZTOm2wj5HfUY71KXQ/330x192?allow_animated=1"
                  />
                </figure>
                <article class="flex w-full flex-1 flex-col gap-3">
                  <h3 class="text-lg font-semibold lg:text-xl">
                    M4A4 | Temukau
                  </h3>
                  <div class="flex w-full items-center gap-2">
                    <p class="text-sm font-medium">Rifle</p>
                    <p class="text-sm text-neutral-500">12 jun. 2025</p>
                  </div>
                </article>
              </div>
              <div
                class="flex w-full cursor-pointer items-center gap-4 overflow-hidden lg:gap-8"
              >
                <figure
                  class="group p-3 bg-white flex items-center justify-center h-[125px] w-[125px] overflow-hidden rounded-xl sm:h-[150px] sm:w-[150px] lg:h-[170px] lg:w-[170px]"
                >
                  <img
                    alt="M4a1s"
                    class="h-[125px] w-[125px] rounded-xl object-contain transition-all duration-300 group-hover:scale-[1.01] sm:h-[150px] sm:w-[150px] lg:h-[170px] lg:w-[170px]"
                    src="https://community.fastly.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alIITBhGJf_NZlmOzA-LP5gVO8v11qa2n6dtOcIQVoMFHUqwC9wei7jcO5vZ3AzSQ1vCMls3fayxKyhh1McKUx0sfzkVMr/330x192?allow_animated=1"
                  />
                </figure>
                <article class="flex w-full flex-1 flex-col gap-3">
                  <h3 class="text-lg font-semibold lg:text-xl">
                    M4A1-S | Cadeia de Caracteres
                  </h3>
                  <div class="flex w-full items-center gap-2">
                    <p class="text-sm font-medium">Rifle</p>
                    <p class="text-sm text-neutral-500">12 jun. 2025</p>
                  </div>
                </article>
              </div>
              <div
                class="flex w-full cursor-pointer items-center gap-4 overflow-hidden lg:gap-8"
              >
                <figure
                  class="group p-3 bg-white flex items-center justify-center h-[125px] w-[125px] overflow-hidden rounded-xl sm:h-[150px] sm:w-[150px] lg:h-[170px] lg:w-[170px]"
                >
                  <img
                    alt="Ak-47"
                    class="h-[125px] w-[125px] rounded-xl object-contain transition-all duration-300 group-hover:scale-[1.01] sm:h-[150px] sm:w-[150px] lg:h-[170px] lg:w-[170px]"
                    src="https://community.fastly.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJegJL_9C3moS0kfv7IbrdqWdY781lxOrH9tyl2APj_RFkYm6ncISWdw42ZwvX8wfoku3s15Tu6czKySZgu3U8pSGKi-NSbdE/330x192?allow_animated=1"
                  />
                </figure>
                <article class="flex w-full flex-1 flex-col gap-3">
                  <h3 class="text-lg font-semibold lg:text-xl">
                    AK-47 | Lótus Selvagem
                  </h3>
                  <div class="flex w-full items-center gap-2">
                    <p class="text-sm font-medium">Rifle</p>
                    <p class="text-sm text-neutral-500">12 jun. 2025</p>
                  </div>
                </article>
              </div>
              <div
                class="flex w-full cursor-pointer items-center gap-4 overflow-hidden lg:gap-8"
              >
                <figure
                  class="group p-3 bg-white flex items-center justify-center h-[125px] w-[125px] overflow-hidden rounded-xl sm:h-[150px] sm:w-[150px] lg:h-[170px] lg:w-[170px]"
                >
                  <img
                    alt="M4A4"
                    class="h-[125px] w-[125px] rounded-xl object-contain transition-all duration-300 group-hover:scale-[1.01] sm:h-[150px] sm:w-[150px] lg:h-[170px] lg:w-[170px]"
                    src="https://community.fastly.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FABz7PLfYQJF-dKxmomZqPv9NLPF2DoAvJ0l2euWrdii3Fblr0toMGGnIYOTIFVtM1_U_Va7xuq7jJfoucnXiSw00w0Iywk/330x192?allow_animated=1"
                  />
                </figure>
                <article class="flex w-full flex-1 flex-col gap-3">
                  <h3 class="text-lg font-semibold lg:text-xl">
                    AWP | Gungnir
                  </h3>
                  <div class="flex w-full items-center gap-2">
                    <p class="text-sm font-medium">Sniper</p>
                    <p class="text-sm text-neutral-500">10 jun. 2025</p>
                  </div>
                </article>
              </div>
              <div
                class="flex w-full cursor-pointer items-center gap-4 overflow-hidden lg:gap-8"
              >
                <figure
                  class="group p-3 bg-white flex items-center justify-center h-[125px] w-[125px] overflow-hidden rounded-xl sm:h-[150px] sm:w-[150px] lg:h-[170px] lg:w-[170px]"
                >
                  <img
                    alt="M4A4"
                    class="h-[125px] w-[125px] rounded-xl object-contain transition-all duration-300 group-hover:scale-[1.01] sm:h-[150px] sm:w-[150px] lg:h-[170px] lg:w-[170px]"
                    src="https://community.fastly.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhjxszFJTwT09S5g4yCmfDLP7LWnn8f6pIl2-yYp9SnjA23-BBuNW-iLI-XJgFsZQyG_VW2lOq918e8uszLn2wj5HeAvkVdtQ/330x192?allow_animated=1"
                  />
                </figure>
                <article class="flex w-full flex-1 flex-col gap-3">
                  <h3 class="text-lg font-semibold lg:text-xl">M4A4 | Uivo</h3>
                  <div class="flex w-full items-center gap-2">
                    <p class="text-sm font-medium">Rifle</p>
                    <p class="text-sm text-neutral-500">12 jun. 2025</p>
                  </div>
                </article>
              </div>
              <div
                class="flex w-full cursor-pointer items-center gap-4 overflow-hidden lg:gap-8"
              >
                <figure
                  class="group p-3 bg-white flex items-center justify-center h-[125px] w-[125px] overflow-hidden rounded-xl sm:h-[150px] sm:w-[150px] lg:h-[170px] lg:w-[170px]"
                >
                  <img
                    alt="M4A4"
                    class="h-[125px] w-[125px] rounded-xl object-contain transition-all duration-300 group-hover:scale-[1.01] sm:h-[150px] sm:w-[150px] lg:h-[170px] lg:w-[170px]"
                    src="https://community.fastly.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf0vL3dzxG6eO6nYeDg7n1a-6GkDoC7pMp3rGYpNqiiQ23-UM5ZT-hcIeQJgZsMFvR_lTox7i-m9bi6-pjfulG/330x192?allow_animated=1"
                  />
                </figure>
                <article class="flex w-full flex-1 flex-col gap-3">
                  <h3 class="text-lg font-semibold lg:text-xl">
                    Glock-18 | Degradê
                  </h3>
                  <div class="flex w-full items-center gap-2">
                    <p class="text-sm font-medium">Rifle</p>
                    <p class="text-sm text-neutral-500">12 jun. 2025</p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>
      {:else}{/if}
    </div>
  </header>
</section>

<style>
  .button {
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

  .button .icon {
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

  .button:hover .icon {
    width: calc(100% - 0.6em);
  }

  .button .icon svg {
    width: 1.1em;
    transition: transform 0.3s;
    color: #7b52b9;
  }

  .button:hover .icon svg {
    transform: translateX(0.1em);
  }

  .button:active .icon {
    transform: scale(0.95);
  }
</style>
