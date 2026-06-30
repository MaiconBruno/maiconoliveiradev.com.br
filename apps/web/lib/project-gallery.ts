import type { GalleryMedia, Project } from '@portfolio/types';

export function buildProjectGallery(project: Project): GalleryMedia[] {
  if (project.galeria?.length) {
    return project.galeria;
  }

  const cover = project.imagens?.[0];
  if (cover) {
    return [{ path: cover, type: 'image' }];
  }

  return [];
}
