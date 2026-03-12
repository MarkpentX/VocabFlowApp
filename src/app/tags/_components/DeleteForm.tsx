import React from 'react';

interface DeleteFormProps {
    id: string;
}

function DeleteForm({id} : DeleteFormProps) {
    // call an action
    return (
        <form>
            <button>
                Delete Word
            </button>
        </form>
    );
}

export default DeleteForm;