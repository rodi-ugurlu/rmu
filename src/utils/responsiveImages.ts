import { responsiveImages } from '../data/responsive-images.generated';

export function getResponsiveImageProps(source: string, preferredWidth: number) {
    const metadata = responsiveImages[source];

    if (!metadata) {
        return {
            src: source,
            srcSet: undefined,
            width: undefined,
            height: undefined,
        };
    }

    const candidates = [
        ...metadata.variants,
        { src: source, width: metadata.width },
    ];
    const fallback =
        candidates.find((candidate) => candidate.width >= preferredWidth) ??
        candidates[candidates.length - 1];

    return {
        src: fallback.src,
        srcSet: candidates
            .map((candidate) => `${candidate.src} ${candidate.width}w`)
            .join(', '),
        width: metadata.width,
        height: metadata.height,
    };
}

export function getResponsiveThumbnailSrc(source: string) {
    const metadata = responsiveImages[source];
    return metadata?.variants[0]?.src ?? source;
}
