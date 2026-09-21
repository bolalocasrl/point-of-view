import { forwardRef, type ImgHTMLAttributes } from "react";
import { srcSetPhoto, urlPhoto, type Photo as PhotoData } from "@/content/story";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "alt"> & {
  photo: PhotoData;
  // how wide the photo is on screen, e.g. "100vw" or "(min-width: 1024px) 33vw, 100vw":
  // the browser then picks the right file (800, 1600 or 2400 px) on its own
  sizes: string;
};

const Photo = forwardRef<HTMLImageElement, Props>(({ photo, sizes, ...rest }, ref) => (
  <img ref={ref} src={urlPhoto(photo)} srcSet={srcSetPhoto(photo)} sizes={sizes} alt={photo.alt} decoding="async" {...rest} />
));

Photo.displayName = "Photo";
export default Photo;
