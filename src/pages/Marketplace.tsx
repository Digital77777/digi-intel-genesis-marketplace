
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ShoppingCart, Star, DollarSign, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const products = [
  {
    name: "Sentiment Analysis Model",
    description: "Pre-trained model for analyzing text sentiment with 95% accuracy",
    price: "$299",
    rating: 4.8,
    downloads: "1.5k",
    category: "NLP Models"
  },
  {
    name: "Face Recognition Dataset",
    description: "Comprehensive dataset with 50k labeled face images",
    price: "$149",
    rating: 4.6,
    downloads: "892",
    category: "Datasets"
  },
  {
    name: "AutoML Pipeline",
    description: "Complete automated machine learning pipeline solution",
    price: "$599",
    rating: 4.9,
    downloads: "456",
    category: "Tools"
  }
];

const Marketplace = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <section className="py-20">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">AI Marketplace</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Buy and sell AI models, datasets, and tools. Find the perfect solution for your project or monetize your AI creations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{product.rating}</span>
                      </div>
                    </div>
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="text-lg font-bold text-green-600">{product.price}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{product.downloads}</span>
                      </div>
                    </div>
                    <Button className="w-full">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Marketplace;
