import { useState } from 'react';
import type { CSSProperties } from 'react';

interface ImageWithSkeletonProps {
    src: string;
    alt: string;
    className?: string;
    loading?: 'lazy' | 'eager';
    aspectRatio?: string;
    fit?: 'cover' | 'contain';
    imageStyle?: CSSProperties;
}

export default function ImageWithSkeleton({
    src,
    alt,
    className = '',
    loading = 'lazy',
    aspectRatio,
    fit = 'cover',
    imageStyle,
}: ImageWithSkeletonProps) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="relative overflow-hidden" style={{ aspectRatio }}>
            {/* Skeleton pulse */}
            {!loaded && (
                <div
                    className="absolute inset-0 animate-pulse"
                    style={{ backgroundColor: 'var(--color-ghost)' }}
                />
            )}
            <img
                src={src}
                alt={alt}
                loading={loading}
                decoding="async"
                onLoad={() => setLoaded(true)}
                className={`w-full ${aspectRatio ? 'h-full' : 'h-auto'} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'
                    } ${className}`}
                style={{ objectFit: fit, ...imageStyle }}
            />
        </div>
    );
}
