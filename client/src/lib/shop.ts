// Products for the /shop page.
//
// They are read live from the Fourthwall Storefront API when a token is set
// (Vercel env var VITE_FW_TOKEN, created in Fourthwall > Settings > For
// developers > Storefront API). Without a token, or if the call fails, the
// page falls back to the list below so it always shows something.

export const SHOP_BASE = "https://point-of-view-tge-shop.fourthwall.com/en-eur";
const API = "https://storefront-api.fourthwall.com/v1/collections/all/products";
const TOKEN = import.meta.env.VITE_FW_TOKEN as string | undefined;

export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  currency: string;
  image: string | null;      // back of the tee: the artwork
  imageAlt: string | null;   // second shot, shown on hover
  url: string;
};

export const productUrl = (slug: string) => `${SHOP_BASE}/products/${slug}`;

export const formatPrice = (value: number, currency: string) =>
  new Intl.NumberFormat("en-IE", { style: "currency", currency }).format(value);

export const FALLBACK_PRODUCTS: Product[] = [
  {
    id: "pov-eye-tee",
    name: "POV EYE TEE",
    slug: "pov-eye-tee",
    price: 26.7,
    currency: "EUR",
    image: "https://imgproxy.fourthwall.dev/dFrKMUvIevQBlsZshHO0UDAwSH5YPZVGiR-h9TNcsnA/w:1920/sm:1/enc/_bSfq5DSSPfCGUYe/14HmnIt9aKf8bbTk/K57jvuILXJFG31D1/L9svh40OX4Z8F2KM/Xjhz3xTuOF6DKZ21/GnIbiBsc-BPd324Z/KUNSKbS-4uV_yTf9/mp__qqxRw3rAuh0e/00zeKAmvkFg-FYWA/rYhD09IYzZLKCPI2/snTJGfAY0x_WgZz-/6TAekpwAnQfXnSSP/4KXH_Y9yNLBoNTOn/tbW46GO_LJ3hBJTB/0_qOM1AXSjk.webp",
    imageAlt: "https://imgproxy.fourthwall.dev/MTWmjsAV4_hfRZWgB4-jhMOVmvaA1iEL2rBoVjjQGmI/w:1920/sm:1/enc/Ati0s6JvsFnB9-0R/KZfLiKZam7MarKkp/4yMkLz33jdJcQq5h/yMNvoLYvUUY1JGEx/vURR3_K4rG0Ldo0M/SleH6S_7p3Ln-F-v/ADAilgQMKGLj3Ajb/au_W223TNGIjG91S/XyR-9ks7KsrAZKHq/vVIhmwOQp-Y4Fv8H/8VuoY8PB_SXdeeyX/lSep4x3c3f2R5HNE/W-kOBL8bmV8ZJKQg/5kGQedoLYLH-RbXf/7jARTsBHvuA.webp",
    url: productUrl("pov-eye-tee"),
  },
  {
    id: "bolo-by-night",
    name: "BOLO BY NIGHT",
    slug: "bolo-by-night",
    price: 26.7,
    currency: "EUR",
    image: "https://imgproxy.fourthwall.dev/i1sc8yeCey54aYjrwYRtkwoVXH513frrKrq9xyS9_2Q/w:1920/sm:1/enc/uC_HzIHITqfwygAY/y3ygkef4dNYNm3xQ/n-0ZFsOEuXadOmDO/n64e5QJ-QYci79mg/m1M_ehhDARyCAnAi/3SP8mSr7L7yx9nGK/H0HwJXtosm1fRWbT/Mhpyl9rVuUCU322k/TvNaeo32uofxJ07z/3y8L5dnRU-fXEj98/3s9NISLlKbzOWBzY/PcqxRriKPY5m7rBI/3MoqRtx1sLxdHA9L/BxDdyMaVdM5Ytzua/Jo4_GFL7F-w.webp",
    imageAlt: "https://imgproxy.fourthwall.dev/FurwnKn1qdk0anjff8WIVx0vePEVibC3yOivRVEP44c/w:1920/sm:1/enc/b5BJRqMDfep0Zvjz/blEw0q_9Pg-SiWgN/Go3M4qi3LEK80EQS/njC7I9zI3G1hlf64/72fZlxYA3cqxD4jm/IxxcUoKekievueHW/tCJVzfFS5vShdZq0/JLIROtl6aFS8cpA1/lxDprZYqzRaEHn8F/2BWt7QYRdziIRdPu/lASAfURXAUgO2Hu0/-fYW4-8qxYorfsZ-/PbtUANKIERhMjo9K/tDIHcL7l-5ZvTvFF/_-6eQ4NFPNg.webp",
    url: productUrl("bolo-by-night"),
  },
  {
    id: "soluna-tee",
    name: "SOLUNA TEE",
    slug: "soluna-tee",
    price: 26.7,
    currency: "EUR",
    image: "https://imgproxy.fourthwall.dev/vs4ZasiYlPaSHn-f2ZT7dv48GNmr1rtl3BbrOqIOAzM/w:1920/sm:1/enc/XorZLV7d6mZjB2m4/XVRP4nxwVPGsjP8N/l8NqhqXfZgp2NL61/Mee7kaMGZ457PAdX/nIcZmqC51TBbpKwm/rcSrwnhimZ8A7YTO/tsGoKlehlwuzO69s/Mybl3BLN1bA3Yxo4/OfAjCNjaNY3UuoZF/nDgwLjTPe-7g7FBN/2JH_V81fn3b9FLco/72cr49BQ3sGp1iYw/1d02W-tIUsOUmsIQ/eYxs6Cn8zAeB3r86/smn-OopTbf4.webp",
    imageAlt: "https://imgproxy.fourthwall.dev/eU0fkchK99BFnQ6KTtksB1SiRcK5OrOsyv3kgQWIEww/w:1920/sm:1/enc/zrtBNAmKq8xmipv3/Nh9BUpDiW4RGWkhm/f7UXDFLF6wi0a2Nn/CVePYnlqwQi1zsdm/fc5R87gPl5u_GL8L/stAc7TT1NTXIlLor/ngeblRL7_0unEqET/9hMoK-uMufq2fJAv/87jWslQqA_8dHzpB/7RG3oM5iCLDJRULQ/mJ30rcXfaG2YVf8Z/yYAPEqqmTsC67l76/pixYARnXX9g8yNbD/Vn0NS8_udIauxvSS/MQdzPEBRtkw.webp",
    url: productUrl("soluna-tee"),
  },
  {
    id: "pov-signature-tee",
    name: "POV SIGNATURE TEE",
    slug: "pov-signature-tee",
    price: 26.7,
    currency: "EUR",
    image: "https://imgproxy.fourthwall.dev/gz9msBYzQyFb4GlymGwGhR_rLKLigazP5ICU-kAYcxU/w:1920/sm:1/enc/rQM5A_KDfP-A1bAk/euDA0Fw4y40hB6kQ/Q1Aw1HXrjuwW0OUx/QOwRhFcOaxADv68A/18S-mjlFIImhjond/hwQF0ZDE3PCFSw1S/i_8ByM5hPqQ8CmWE/Efr10mSF4_y5sT2e/tdDkJfqvE9-d9Jg2/U8McUPuvXCq4duMi/UAiKV9m9V9jf--Gn/BiUaCT2fBIi2QbUr/kRInRG6fPEXw_4Qv/ZlFqLi4XP5nceN6q/1lgeQUh72XM.webp",
    imageAlt: "https://imgproxy.fourthwall.dev/tKGbqohybqtSiw0PxC11lKH1RzGYLCnMmYDsTo8QXmY/w:1920/sm:1/enc/H2R2y4lg3qXhwJhL/aO1xP6Nx1S55TsTa/Ngx0xbXnRc-Y-zqj/jKy1rtBNlzVTJUsD/nAG4McTFl93g6l0X/S1JUqtTmSMVV9Y0j/nAl0qskQw7QKf1wO/WtAbAOKfw8eOFQW_/bZlnTOfjznxRudaC/ZkwdflG-VAwu6hnk/IqrQHlR5XGAbRV4i/7c_ERk_J5wUssnes/uq8UeFBkMLZuYtjZ/Lmolp8y--cdY5wZ7/s9YwpEGVqc4.webp",
    url: productUrl("pov-signature-tee"),
  },
  {
    id: "bcn-style",
    name: "BCN STYLE",
    slug: "bcn-style",
    price: 26.7,
    currency: "EUR",
    image: "https://imgproxy.fourthwall.dev/q-aZ39Tpx1HoYVRNllZQlGkhrGQwYvp0x7MEjxaxqJE/w:1920/sm:1/enc/RrPn-ZYiLDvyjcsd/pvblry11TZrCvB8T/2HIh0ROYBmx2O2LY/v06DxMAaLdHUJMxg/gLDw5BIWKT5FW9aC/qLxlNQDnrtpinrXY/2yH88jTFDPHgpA6I/-LcAoLt5I2tH4AQn/DU_FxjJZxlB4hif_/_L34R-rbrWN5dfwx/yEvb7FVXv7wsalUO/pWM7x77emD34vP8b/QsicSJfbTwcQhd29/Ti8SrPGsGu-pEE1Q/F3DWzf39dGg.webp",
    imageAlt: "https://imgproxy.fourthwall.dev/i8wNkZYbW9WeL4yRpQxgzlTMtP0ijNyQrsM-nYjZICM/w:1920/sm:1/enc/8t9xeC2CwQ-Gq9if/usf6gWN21o_ZDKIW/qYSD9sKragbL33g-/Y8JX6B5HDJ1huq87/QFBTSGjK8WXw2mpc/-haal3Jy2VQoZu7S/dlLOtz-wt7mFjgK3/ZCCmbIUUdGqFyq2U/8fsNOsCJNqRD4zuF/c8dIRQc5hxWBz2YK/yJwXTqFljRQxCXot/zpC5GNtnG9lTeJbu/2Su-ghC_cus84A8w/smEN5ulcjEQ8TDC0/lXaSbJ-1uq4.webp",
    url: productUrl("bcn-style"),
  },
  {
    id: "headquarter-lisboa",
    name: "HEADQUARTER, LISBOA",
    slug: "headquarter-lisboa",
    price: 31.16,
    currency: "EUR",
    image: "https://imgproxy.fourthwall.dev/mhuqTtVWX_eyg9yZECpoIIU4opdJC0r6wE82ECB9h0k/w:1920/sm:1/enc/fKCGnYh8VA7vapA0/ug9ppoJQsynx80Dk/HCVQU0yIMi7Oyb1-/DPya3UEeQvxWCpDU/j84qXB8G34eZnlUO/VCqLnwnf-BrfO-0h/gHvGvZSSwSNXHcix/d0yotg-BNH4UYqnl/Xm62-HB5KMCaRJf1/tmB3Q8fytVS6Z-Gr/ynFwlws_PMtX3FDZ/nsPryig_pce4Vob6/xV7ihJhHwwpQhi6Y/Z_WkrubY0mLRDz11/KyVP5dGFYlY.webp",
    imageAlt: "https://imgproxy.fourthwall.dev/cnAbC_6dIinx5r7JonhI4_ZoYL43Z5l2iERbLWsoi84/w:1920/sm:1/enc/Ke_8LH43mZI9eTIS/csFiKMTL-oVBAXm9/7fiMzAycgIGPkA6X/6R2HjeTzzDbw6BpS/S8SR0CYOtsrpUliU/XNRsJ3nb1KrKgOv5/jeXIK2vy4aHmBWg_/qn7FRyVRAGQxC62y/W7OjNzU6ni43w0rc/aYc33TCBogLFb8OL/C_LrCxU70sR6aaz_/KdbooJo643AiDiHv/OXo1NAQJU6pHhd-r/aXDfJygwHVqzP1px/Es2pgEvNxn8.webp",
    url: productUrl("headquarter-lisboa"),
  },
];

type ApiProduct = {
  id: string;
  name: string;
  slug: string;
  images?: { url?: string }[];
  price?: { value?: number; currency?: string };
  access?: { type?: string };
  state?: { type?: string };
};

export async function fetchProducts(signal?: AbortSignal): Promise<Product[]> {
  if (!TOKEN) return FALLBACK_PRODUCTS;

  const res = await fetch(`${API}?storefront_token=${TOKEN}&currency=EUR&size=50`, { signal });
  if (!res.ok) throw new Error(`Storefront API: ${res.status}`);

  const data: { results?: ApiProduct[] } = await res.json();
  const products = (data.results ?? [])
    .filter((p) => p.access?.type !== "PRIVATE")
    .map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      price: p.price?.value ?? 0,
      currency: p.price?.currency ?? "EUR",
      image: p.images?.[1]?.url ?? p.images?.[0]?.url ?? null,
      imageAlt: p.images?.[11]?.url ?? p.images?.[0]?.url ?? null,
      url: productUrl(p.slug),
    }));

  return products.length ? products : FALLBACK_PRODUCTS;
}
