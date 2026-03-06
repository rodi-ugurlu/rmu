interface SectionLabelProps {
    children: string;
}

export default function SectionLabel({ children }: SectionLabelProps) {
    return (
        <p
            className="uppercase font-bold"
            style={{
                fontSize: 'var(--font-label)',
                letterSpacing: 'var(--letter-label)',
                color: 'var(--color-muted)',
                marginBottom: 'var(--space-element)',
            }}
        >
            {children}
        </p>
    );
}
