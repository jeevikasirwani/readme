import  { useEffect, useState } from "react";

interface QuoteType {
  text: string;
  author: string;
  position: string;
}

const quotes: QuoteType[] = [
  {
    text: "The customer support I received was exceptional. The support team went above and beyond to address my concerns.",
    author: "Julie Winfield",
    position: "CEO | Acme Corp"
  },
  {
    text: "Writing is the painting of the voice, a bridge between thoughts and reality.",
    author: "Marcus Chen",
    position: "Author | ThoughtSpace"
  },
  {
    text: "In the world of words, every story finds its home, every voice finds its echo.",
    author: "Sarah Mitchell",
    position: "Editor-in-Chief | StoryHub"
  },
  {
    text: "Blogging is not just writing, it's connecting hearts through words.",
    author: "David Anderson",
    position: "Content Strategist | WordFlow"
  },
  {
    text: "The best ideas come from sharing thoughts freely and fearlessly.",
    author: "Emma Thompson",
    position: "Creative Director | Mindscape"
  }
];

function Quote() {
  const [quote, setQuote] = useState<QuoteType>(quotes[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="max-w-md mx-auto p-8">
        <blockquote className="text-center">
          <p className="text-3xl font-bold mb-8 text-gray-800 leading-relaxed">
            "{quote.text}"
          </p>
          <footer className="mt-6">
            <p className="text-xl font-semibold text-gray-800">
              {quote.author}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              {quote.position}
            </p>
          </footer>
        </blockquote>
      </div>
    </div>
  );
}

export default Quote;
