import type { CharacterSearchQuery } from "@/schemas/characters-search-query.interface";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type CharacterSearchProps = {
    initialData?: CharacterSearchQuery,
    onSearch: (searchData?: CharacterSearchQuery) => void
    onCancel: () => void
}

export default function CharacterSearch({initialData, onSearch, onCancel}: CharacterSearchProps) {
    const [form, setForm] = useState<CharacterSearchQuery | undefined>(initialData);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((previousData) => ({...previousData, [name]: value }));
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        onSearch(form);
    }

    const handleClear = () => {
        setForm(undefined);
    }

    const handleCancel = () => {
        onCancel();
    }

    return (
        <div className="flex w-full justify-center p-4">
            <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-4">
                <Label>Name</Label>
                <Input
                    name="name" 
                    value={form?.name || ''} 
                    onChange={handleChange} 
                    placeholder="Name" 
                />
                <Label htmlFor="email">Minimum Base Ki</Label>
                <Input
                    name="minBaseKi"
                    type="number"
                    value={form?.minBaseKi || ''}
                    onChange={handleChange}
                    placeholder="Minimum Base Ki"
                />
                <Label htmlFor="email">Maximum Base Ki</Label>
                <Input
                    name="maxBaseKi"
                    type="number"
                    value={form?.maxBaseKi || ''}
                    onChange={handleChange}
                    placeholder="Maximum Base Ki"
                />
                <div className="flex justify-between">
                    <Button type="submit">Search</Button>
                    <Button type="button" variant="secondary" onClick={handleClear}>Clear</Button>
                    <Button type="button" variant="outline" onClick={handleCancel}>Cancel</Button>
                </div>
            </form>
        </div>
    )
}