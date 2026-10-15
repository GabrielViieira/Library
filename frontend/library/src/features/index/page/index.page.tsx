import { Card, CardContent } from "../../../components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../../../components/ui/carousel";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../../../components/ui/tabs";
import { useSearchBooks } from "../../books/hooks/searchBook.hook";
import type { BookDataForm } from "../../books/schema/book.schema";

export function HomePage() {
    const { data: books } = useSearchBooks({
        title: "",
        author: "",
        category: "",
    });

    const featuredBooks = books?.slice(0, 6) ?? [];

    return (
        <main className="min-h-screen bg-(--site-bg) px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-8">

                <section className="space-y-2">
                    <p className="text-sm font-medium uppercase tracking-wider text-(--primary-accent)">
                        Welcome to LibrisPro
                    </p>

                    <h1 className="text-3xl font-bold tracking-tight text-(--text-main) sm:text-4xl">
                        Explore your library
                    </h1>

                    <p className="max-w-2xl text-sm text-(--text-secondary) sm:text-base">
                        Discover books, authors and categories from your library collection.
                    </p>
                </section>

                <section className="w-full">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent>
                            {Array.from({ length: 3 }).map((_, index) => (
                                <CarouselItem key={index} className="basis-full">
                                    <div className="p-1">
                                        <Card className="h-64 w-full overflow-hidden border-(--border-color) bg-(--card-bg) sm:h-80 lg:h-96">
                                            <CardContent className="flex h-full w-full items-center justify-center p-0">
                                                <div className="flex h-full w-full items-center justify-center bg-(--surface-hover)">
                                                    <span className="text-sm text-(--text-secondary)">
                                                        Banner {index + 1}
                                                    </span>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        <CarouselPrevious className="cursor-pointer left-4 border-(--border-color) bg-(--card-bg) text-(--text-main) hover:bg-(--surface-hover)" />
                        <CarouselNext className="cursor-pointer right-4 border-(--border-color) bg-(--card-bg) text-(--text-main) hover:bg-(--surface-hover)" />
                    </Carousel>
                </section>

                <section className="rounded-xl border border-(--border-color) bg-(--card-bg) p-5">
                    <Tabs defaultValue="feature" className="w-full">
                        <TabsList className="mb-6 bg-(--site-bg)">
                            <TabsTrigger
                                value="feature"
                                className="cursor-pointer data-[state=active]:bg-(--primary-accent) data-[state=active]:text-(--text-on-accent)"
                            >
                                Featured Books
                            </TabsTrigger>

                            <TabsTrigger
                                value="books"
                                className="cursor-pointer data-[state=active]:bg-(--primary-accent) data-[state=active]:text-(--text-on-accent)"
                            >
                                All Books
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="feature">
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                                {featuredBooks.map((book: BookDataForm) => (
                                    <Card
                                        key={book.id}
                                        className="cursor-pointer group overflow-hidden rounded-md border border-(--border-color) bg-(--site-bg) p-0 transition-all duration-200 hover:-translate-y-1 hover:border-(--primary-accent)"
                                    >
                                        <div className="relative aspect-3/4 overflow-hidden bg-(--card-bg)">
                                            {book.imageUrl ? (
                                                <img
                                                    src={book.imageUrl}
                                                    alt={book.title}
                                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center">
                                                    <span className="text-5xl">📖</span>
                                                </div>
                                            )}
                                        </div>

                                        <CardContent className="space-y-1 p-3">
                                            <div className="flex flex-wrap gap-1">
                                                {book.categories?.slice(0, 2).map(
                                                    (category: any) => (
                                                        <span
                                                            key={category._id}
                                                            className="truncate text-[10px] font-medium text-(--primary-accent)"
                                                        >
                                                            {category.category}
                                                        </span>
                                                    )
                                                )}
                                            </div>

                                            <h3 className="truncate text-sm font-semibold text-(--text-main)">
                                                {book.title}
                                            </h3>

                                            <p className="truncate text-xs text-(--text-secondary)">
                                                {book.author ?? "Unknown author"}
                                            </p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="books">
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                                {books?.map((book: BookDataForm) => (
                                    <Card
                                        key={book.id}
                                        className="cursor-pointer group overflow-hidden rounded-md border border-(--border-color) bg-(--site-bg) p-0 transition-all duration-200 hover:-translate-y-1 hover:border-(--primary-accent)"
                                    >
                                        <div className="relative aspect-3/4 overflow-hidden bg-(--card-bg)">
                                            {book.imageUrl ? (
                                                <img
                                                    src={book.imageUrl}
                                                    alt={book.title}
                                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center">
                                                    <span className="text-5xl">📖</span>
                                                </div>
                                            )}
                                        </div>

                                        <CardContent className="space-y-1 p-3">
                                            <div className="flex flex-wrap gap-1">
                                                {book.categories?.slice(0, 2).map(
                                                    (category: any) => (
                                                        <span
                                                            key={category._id}
                                                            className="truncate text-[10px] font-medium text-(--primary-accent)"
                                                        >
                                                            {category.category}
                                                        </span>
                                                    )
                                                )}
                                            </div>

                                            <h3 className="truncate text-sm font-semibold text-(--text-main)">
                                                {book.title}
                                            </h3>

                                            <p className="truncate text-xs text-(--text-secondary)">
                                                {book.author ?? "Unknown author"}
                                            </p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </section>

            </div>
        </main>
    );
}