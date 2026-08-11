import styles from './CopyableText.module.css';
import { useCopyToClipboard } from '@hooks';

function CopyableText({ text, className, children }) {
    const { copyToClipboard, copied } = useCopyToClipboard();

    const handleCopy = (e) => {
        e.stopPropagation(); // чтобы не срабатывали родительские onClick
        copyToClipboard(text);
    };

    return (
        <h1
            className={`${className} ${styles.copyableText}`}
            onClick={handleCopy}
            style={{ cursor: 'pointer' }}
            title="Click to copy"
        >
            {children || text}
            {copied && (
                <span className={styles.copyTooltip}>
                    ✓ Copied!
                </span>
            )}
        </h1>
    );
}

export default CopyableText;