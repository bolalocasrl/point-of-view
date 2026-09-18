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
  image: string | null;
  url: string;
};

export const productUrl = (slug: string) => `${SHOP_BASE}/products/${slug}`;

export const formatPrice = (value: number, currency: string) =>
  new Intl.NumberFormat("en-IE", { style: "currency", currency }).format(value);

export const FALLBACK_PRODUCTS: Product[] = [
  {
    id: "headquarter-lisboa",
    name: "HEADQUARTER, LISBOA",
    slug: "headquarter-lisboa",
    price: 31.09,
    currency: "EUR",
    image: "https://imgproxy.fourthwall.dev/m81l9rrP4Knx4Sn2lSxypsRQRqojP6WaA8OxCGfAX1I/w:720/sm:1/enc/tNp4g-EY-eN80qcE/Pn36q79Tuds6wswD/L-uXlVU134iGmkEe/NSpfbi6cTflYEtcE/GN2fSRysGgs5vibo/X8pXpK8EUU9xXWPX/aeLG44RpNR_2hnlH/UEIP6GBJpUsF_fh_/T2x-h6-FqFi666PM/Y-932FX3m_vIXNDD/IZdPLi6jfkjbSaeD/SrjjMBHK2x01v_06/qax3tLFaiTE67vEv/v1HX-xmAz2J11ly7/uErbdZLePYs.jpg",
    url: productUrl("headquarter-lisboa"),
  },
  {
    id: "bcn-style",
    name: "BCN STYLE",
    slug: "bcn-style",
    price: 26.65,
    currency: "EUR",
    image: "https://imgproxy.fourthwall.dev/kpQWWVvi9nm8imPi9Oo4nj4GnDumsBh9cQPi4oBEQOQ/w:720/sm:1/enc/JQoQF7jeyfpJ1Q9E/AGGJB4NQr-Z4mOEX/7QQUYnc1pgOh1WKd/g1En6-TwWoAdDcNH/qCOFyFYHf3wm4KCu/0S_PvMlA9telsD1N/Cv8w0zkTPMd2LROY/vmP-Vyp7SMA7iZ_S/Q9HobQvOVyUoj847/MmIGdbOJuXYXpfPD/2fJF_kKM0YVZipXf/2t1UhnbP4HVZtTy5/8qOAiHkRYSfusPma/_kUC65Y4PvNBclTY/dA-Vf_y_zb8.jpg",
    url: productUrl("bcn-style"),
  },
  {
    id: "pov-signature-tee",
    name: "POV SIGNATURE TEE",
    slug: "pov-signature-tee",
    price: 26.65,
    currency: "EUR",
    image: "https://imgproxy.fourthwall.dev/ULUGuCWb5UkEYC7kCiTxfhpSffMsmR0ADuRwSJJUQqc/w:720/sm:1/enc/83I0B3MharBc1DQS/9hiIoVtoOWkqjIR6/-meb3SFXLvDaciD1/KkQwR59paz2oPn6s/sy7rb3lteso9Lthx/EM4KzXT8cFgut25C/EJjKcSCXcDlh9DyP/4fJ6St9uWVL4JtjJ/0BoPO6q4lGJZpkHN/8V1lwB6RcNKgw2ir/_zR5LBn616axp3kU/r__2B-xsy8-8-6jP/baekxzgxQrINx8gp/ruI34H914ao62MxE/oTO1O-9XxXQ.jpg",
    url: productUrl("pov-signature-tee"),
  },
  {
    id: "soluna-tee",
    name: "SOLUNA TEE",
    slug: "soluna-tee",
    price: 26.65,
    currency: "EUR",
    image: "https://imgproxy.fourthwall.dev/PRRlkhraWDwNsUPG1gGkLKsXvPaCGgxtXIHUxnfStMY/w:720/sm:1/enc/CrjYHknYHf0r8iLZ/bmuS7399Sj3Wco1D/8v1YhXfH88tzc3kt/QeIoyrUFQDh_qtJt/JNJW-DIMyQgbc9T8/Yb9Qzl5iWsW-E28_/R16pWvZ3wdTv0EkL/BTBKWst71CXgpnY-/UgXSk86Ch8bNc3iU/CYo141gxrzdm3aBf/hQywmM9r1QB0ZTEp/1V2Y7yxlXApXRRQa/ec7GnfaG2xDRY6Ju/Mhfloj4UzSS3Sq38/Nffyx2Bosns.jpg",
    url: productUrl("soluna-tee"),
  },
  {
    id: "bolo-by-night",
    name: "BOLO BY NIGHT",
    slug: "bolo-by-night",
    price: 26.65,
    currency: "EUR",
    image: "https://imgproxy.fourthwall.dev/N0EdnxtDDEJr7t2Khby7j7RnsAugfiswtkS1Nvukaxs/w:720/sm:1/enc/RR6CypnilMSHlnZV/KTrCsqCd8gAS0rBg/XChVuk93FrSvfjze/6D2if_7HsVYKBe5W/DUgeTYeHPIrCjjQ4/O3N5nrwCt2Ivt9zX/HfjfI_bwXXcNJ1OQ/ddqa5cKgFdU4i_aG/OGTk97rWyUxpSnv0/gPAgA3-_tgG2xcEA/JprlMGdzd4Cs2XiE/9nZG-_Yi3d7jg8PY/T6A6iKxTnDSNHr-8/CvaFQ5bjb0iTpFhC/XGSa1asB3Wg.jpg",
    url: productUrl("bolo-by-night"),
  },
  {
    id: "pov-logo-tee",
    name: "POV LOGO TEE",
    slug: "pov-logo-tee",
    price: 26.65,
    currency: "EUR",
    image: "https://imgproxy.fourthwall.dev/VEK49a9TMx6sOU9ulb8ymkuzaZn0gsC3iIbdfvC03G4/w:720/sm:1/enc/N3ED0uUYyIY35WKQ/ieCzyIg6onQrQzGD/jpRc5h9Qfo2T70Mv/cXnEKgfz3HGKJW9I/At2LONmTLYohbeNf/zdgrXwye0FBRHSu0/KJ59cAB_6zbqZjhm/b6Gk-BHodJB2iAhm/44YZwUBrSu48kzIv/LuowYO0SHM_OUP-b/RGk7nr2vHW6qHew0/HnTkhfDuj86-n5dy/sc1YMcjngGJiMCBt/kp8uq6yn9FXIqLXW/Yg4n43CcNG4.jpg",
    url: productUrl("pov-logo-tee"),
  },
  {
    id: "pov-eye-tee",
    name: "POV EYE TEE",
    slug: "pov-eye-tee",
    price: 26.65,
    currency: "EUR",
    image: "https://imgproxy.fourthwall.dev/IlQUgGtf7qERzF8VM6GPlRlraZvP2xo5nJWOaekcEXs/w:720/sm:1/enc/GUQqQtoK2mfsm2KA/b_9GJYedN34nWKIk/6Czdc1IAlkgc7bBx/utpwYuUov131GEqZ/X6SFYGu7EbgoAxxb/BEAjByzKP5Q1LP3r/Oy2JCeFFteDO61Ab/QaAbI4Q5gG1HcyeO/p2Q3JiPSZNpNdexf/QWVxyD0rnxNO61nG/LETI6j0gTEwmES_y/tno6GseQKx-jp9KC/b7pAfr41jannS95m/jNRnBhm7Vp6tCNdG/EgMQH3GOBEM.jpg",
    url: productUrl("pov-eye-tee"),
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
      image: p.images?.[0]?.url ?? null,
      url: productUrl(p.slug),
    }));

  return products.length ? products : FALLBACK_PRODUCTS;
}
