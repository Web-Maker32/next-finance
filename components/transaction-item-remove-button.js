'use client'

import Button from "./button";
import { LoaderCircle, X } from 'lucide-react';
import { deleteTransaction } from "@/libs/action";
import { useState } from "react";

export default function TransactionItemRemoveButton({ id, onRemoved }) {
    const [loading, setLoading] = useState()
    const [confirmed, setConfirmed] = useState(false)
    const handleClick = async () => {
        if (!confirmed) {
            setConfirmed(true)
            return
        }
        try {
            setLoading(true)
            await deleteTransaction(id);
            onRemoved()
        } finally {
            
            setLoading(false)
        }
        
    }
    return (
        <Button size="xs" variant={confirmed ? "danger" : "ghost"} onClick={handleClick} aria-disabled={loading}>
            {!loading && <X className="w-4 h-4" />}
            {loading && <LoaderCircle className="w-4 h-4 animate-spin"/>}
        </Button>
    );
}
