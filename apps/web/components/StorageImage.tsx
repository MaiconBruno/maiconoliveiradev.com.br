import Image from 'next/image';
import { getStorageUrl } from '@/lib/utils';
import { cn } from '@/lib/utils';

type StorageImageProps = {
  path: string | null | undefined;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
};

export function StorageImage({
  path,
  alt,
  className,
  fill,
  width,
  height,
  priority,
  sizes,
}: StorageImageProps) {
  const src = getStorageUrl(path);
  if (!src) return null;

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn('object-cover', className)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 800}
      height={height ?? 450}
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}
