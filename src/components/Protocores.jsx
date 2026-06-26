import React, { useState, useEffect, useRef } from 'react';
import styles from './Protocores.module.css';
import ProtocoreBlock from './ProtocoreBlock';
import ModalWindowProtocore from './ModalWindowProtocore';

function Protocores() {
    const [protocores, setProtocores] = useState([]);
    const modalRef = useRef();

    useEffect(() => {
        const savedProtocores = JSON.parse(localStorage.getItem('protocores') || '[]');
        setProtocores(savedProtocores);
    }, []);

    const handleAddProtocore = () => {
        modalRef.current?.showModal();
    };

    const handleSaveProtocore = (newProtocore) => {
        setProtocores(prev => [...prev, newProtocore]);
    };

    const handleUpdateProtocore = (updatedProtocore) => {
        setProtocores(prev => prev.map(p =>
            p.id === updatedProtocore.id ? updatedProtocore : p
        ));
    };

    const handleEditProtocore = (protocore) => {
        modalRef.current?.showModal(protocore);
    };

    const handleDeleteProtocore = (protocoreToDelete) => {
        // Показываем подтверждение перед удалением
        const confirmDelete = window.confirm(
            `Are you sure you want to delete ${protocoreToDelete.type.charAt(0).toUpperCase() + protocoreToDelete.type.slice(1)} Protocore (Lv. ${protocoreToDelete.level})?`
        );

        if (confirmDelete) {
            // Удаляем из localStorage
            const existingProtocores = JSON.parse(localStorage.getItem('protocores') || '[]');
            const updatedProtocores = existingProtocores.filter(
                p => p.id !== protocoreToDelete.id
            );
            localStorage.setItem('protocores', JSON.stringify(updatedProtocores));

            // Обновляем состояние
            setProtocores(prev => prev.filter(p => p.id !== protocoreToDelete.id));
        }
    };

    return (
        <section className={styles.container}>
            <button
                className={styles.addButton}
                onClick={handleAddProtocore}
            >
                Add protocore
            </button>

            <section className={styles.protocoreList}>
                {protocores.length === 0 ? (
                    <div className={styles.emptyState}>
                        No protocores added yet. Click "Add protocore" to create one!
                    </div>
                ) : (
                    protocores.map(protocore => (
                        <ProtocoreBlock
                            key={protocore.id}
                            protocore={protocore}
                            onEdit={handleEditProtocore}
                            onDelete={handleDeleteProtocore}
                        />
                    ))
                )}
            </section>

            <ModalWindowProtocore
                ref={modalRef}
                title="Add New Protocore"
                onSave={handleSaveProtocore}
                onUpdate={handleUpdateProtocore}
            />
        </section>
    );
}

export default Protocores;