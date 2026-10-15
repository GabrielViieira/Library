// src/pages/AuthorsPage.tsx
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../../components/ui/card";
import { AuthorList } from "../hooks/listAuthors.hook";
import type { AuthorDataForm } from "../schema/author.schema";

export function AuthorsPage() {
    const navigate = useNavigate();
    const { data: authors, isPending, isError } = AuthorList();

    if (isPending) return <p className="text-center p-6 text-gray-500">Carregando autores...</p>;
    if (isError) return <p className="text-center p-6 text-red-500">Erro ao carregar autores.</p>;

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Autores da Biblioteca</h1>
                <p className="text-gray-500 text-sm mt-1">Click on an author to explore their literary works.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {authors?.map((author: AuthorDataForm) => {

                    return (
                        <Card
                            key={author.id}
                            onClick={() => navigate(`/books/search?author=${author.name}`)}
                            className="relative w-full h-56 bg-cover bg-center overflow-hidden group cursor-pointer border-none shadow-md hover:shadow-lg hover:-translate-y-1 transition-all rounded-xl"
                        >
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />

                            <CardContent className="absolute bottom-0 left-0 p-4 w-full z-10 flex flex-col">
                                <h3 className="text-xl font-bold text-white tracking-wide uppercase drop-shadow-md">
                                    {author.name}
                                </h3>
                            </CardContent>
                        </Card>
                    );
                })}

                {authors?.length === 0 && (
                    <p className="text-gray-500 col-span-4 text-center py-12">Nenhum autor cadastrado no sistema.</p>
                )}
            </div>
        </div>
    );
}
