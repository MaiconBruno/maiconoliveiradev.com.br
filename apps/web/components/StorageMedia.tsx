import Image from 'next/image';
import type { GalleryMedia } from '@portfolio/types';
import { getStorageUrl } from '@/lib/utils';
import { cn } from '@/lib/utils';

type StorageMediaProps = {
  item: GalleryMedia;
  alt: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
};

export function StorageMedia({ item, alt, className, fill, priority }: StorageMediaProps) {
  const src = getStorageUrl(item.path);
  if (!src) return null;

  if (item.type === 'video') {
    return (
      <video
        src={src}
        className={cn('h-full w-full object-cover object-top', className)}
        autoPlay
        loop
        muted
        playsInline
        controls={false}
      />
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 768px"
        className={cn('object-cover object-top', className)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={1280}
      height={800}
      priority={priority}
      className={cn('h-full w-full object-cover object-top', className)}
    />
  );
}
