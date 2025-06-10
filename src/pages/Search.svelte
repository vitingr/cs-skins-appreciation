<script>
  import { RARITY_ADAPTER } from "../constants/calculator/rarity";

  import { api } from "../constants/instances/api";
  import { calculator } from "../constants/instances/calculator";

  let userId = "";
  let inventoryItems = null;
  let isLoading = false;

  const fetchInvetoryItems = async () => {
    if (!userId) return;
    isLoading = true;

    try {
      const response = await api.getUserInventoryItems({ userId });

      const maxMarketQuantity = Math.max(
        // @ts-ignore
        ...response.map((item) => item.buyordervolume ?? item.offervolume ?? 0),
      );

      // @ts-ignore
      inventoryItems = response.map((item) => {
        const chance = calculator.calculateAppreciationChance({
          currentPrice: item.pricereal ?? item.priceavg,
          marketQuantity: item.buyordervolume ?? item.offervolume,
          maxCategoryPrice: item.pricemax ?? 1,
          maxMarketQuantity,
          // @ts-ignore
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

<section class="section-container">
  <header class="section-content">
    <article class="container">
      <h2 class="title">Busca de Inventário</h2>
    </article>
    <div class="container">
      <input
        type="text"
        placeholder="Digite o Steam ID"
        bind:value={userId}
        on:keypress={(e) => e.key === "Enter" && fetchInvetoryItems()}
      />
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
  </header>
</section>

<style>
  .section-container {
    padding: 64px 16px;
    width: 100%;
  }

  .section-content {
    max-width: 1280px;
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 32px;
    align-items: center;
  }

  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
  }

  .title {
    font-size: 48px;
    color: white;
    font-weight: 600;
  }

  input {
    border: 1px solid #27272a;
    border-radius: 20px;
    padding: 12px 20px;
    color: white;
    font-size: 16px;
    max-width: 560px;
    width: 100%;
  }

  input:focus {
    outline: none;
  }

  button {
    margin-top: 24px;
    background: #a370f0;
    color: white;
    font-family: inherit;
    padding: 0.35em;
    padding-left: 1.2em;
    font-size: 17px;
    font-weight: 500;
    border-radius: 0.9em;
    border: none;
    letter-spacing: 0.05em;
    display: flex;
    align-items: center;
    box-shadow: inset 0 0 1.6em -0.6em #714da6;
    overflow: hidden;
    position: relative;
    height: 2.8em;
    padding-right: 3.3em;
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
