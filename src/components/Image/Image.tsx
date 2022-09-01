interface Props {
    src: string;
    alt: string;
    className?: string;
}

const Image: React.FC<Props> = ({ src, alt, className }) => (
    <img src={src} alt={alt} className={className} />
);

export default Image;
