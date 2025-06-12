<script lang="ts">
  import { FOOTER_LINKS } from "./data";

  interface FooterLinkProps {
    label: string;
    href: string;
  }

  interface FooterSectionProps {
    title: string;
    links: FooterLinkProps[];
  }
</script>

<footer
  class="relative z-20 w-full border-t-2 border-neutral-200 bg-neutral-100 px-4 py-8 sm:py-12 lg:pt-14 lg:pb-20"
>
  <div
    class="mx-auto flex w-full max-w-3xl flex-col justify-between gap-6 border-b border-neutral-300 pb-6 md:flex-row lg:max-w-6xl lg:gap-12"
  >
    {#each FOOTER_LINKS as footerSection, sectionIndex}
      <article
        class="flex w-full flex-col gap-4 border-b border-neutral-300 pb-4 sm:border-transparent sm:pb-0 lg:gap-6"
      >
        <h3 class="font-medium lg:text-lg">{footerSection.title}</h3>
        <div class="flex w-full flex-col gap-2">
          {#each footerSection.links as footerLink, index}
            <a
              class="w-fit border-b border-transparent text-xs transition-all duration-300 hover:text-neutral-900 sm:text-xs lg:text-sm"
              href={footerLink.href}
              target={sectionIndex === 2 ? "_blank" : "_self"}
            >
              {footerLink.label}
            </a>
          {/each}
        </div>
      </article>
    {/each}
  </div>

  <div
    class="mx-auto flex w-full max-w-3xl items-center gap-6 pt-4 md:pt-6 lg:max-w-6xl"
  >
    <p class="w-full text-[13px] font-light sm:text-xs lg:text-sm">
      Copyright © 2024 Educational AI All rights reserved.
    </p>
    <p class="w-full text-right text-[13px] font-light sm:text-xs lg:text-sm">
      Brazil
    </p>
  </div>
</footer>

<style></style>
