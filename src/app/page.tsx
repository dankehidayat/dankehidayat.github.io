import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  BookOpen,
  PenTool,
  Code,
  Cpu,
  Calendar,
} from "lucide-react";
import { getLatestPosts, BlogPost } from "@/lib/rss";

export default async function Home() {
  // Fix TypeScript error by specifying the type
  let latestPosts: BlogPost[];
  try {
    latestPosts = await getLatestPosts(2);
  } catch (error) {
    console.error("Error in page component:", error);
    latestPosts = [];
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center py-20 px-6">
        <div className="container max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center rounded-sm border border-border px-4 py-2 mb-12 text-sm text-muted-foreground bg-muted/50 tracking-wide font-domine">
            <PenTool className="h-4 w-4 mr-2" />
            Software Developer &amp; Writer
          </div>

          <h1 className="mb-8 leading-tight">
            <span className="initial-cap">Welcome,</span>
            <br />
            I&apos;m <span className="text-primary">Danke Hidayat</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed text-justify">
            A passionate{" "}
            <span className="text-foreground font-semibold">
              Software Developer
            </span>{" "}
            and <span className="text-foreground font-semibold">Writer</span>{" "}
            crafting digital experiences with the precision of fine typography.
            Currently pursuing Computer Engineering at IPB University.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <Button
              asChild
              size="lg"
              className="btn-classic-primary gap-3 px-8 py-3 font-domine"
            >
              <Link href="/experience">
                Explore My Journey
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="btn-classic gap-3 px-8 py-3 font-domine"
            >
              <Link href="/blog">
                <BookOpen className="h-4 w-4" />
                Read My Writings
              </Link>
            </Button>
          </div>

          {/* Classic Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto text-center border-t border-b border-border py-8">
            <div>
              <div className="text-2xl text-foreground font-heading">2+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider font-domine">
                Years Experience
              </div>
            </div>
            <div>
              <div className="text-2xl text-foreground font-heading">5+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider font-domine">
                Projects
              </div>
            </div>
            <div>
              <div className="text-2xl text-foreground font-heading">3.57</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider font-domine">
                GPA Score
              </div>
            </div>
            <div>
              <div className="text-2xl text-foreground font-heading">2025</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider font-domine">
                Graduation
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Skills Section */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-4xl mx-auto px-6">
          <h2 className="text-center mb-4">Craft &amp; Expertise</h2>
          <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto text-justify">
            From mobile applications to web services, I approach each project
            with the care of a master craftsman and the precision of a
            typesetter.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-classic text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mx-auto mb-6 border border-primary/20">
                  <Code className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading mb-4">Software Development</h3>
                <p className="text-muted-foreground text-justify">
                  Building scalable applications with modern frameworks,
                  following time-tested principles of clean architecture and
                  maintainable code.
                </p>
              </CardContent>
            </Card>

            <Card className="card-classic text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mx-auto mb-6 border border-primary/20">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading mb-4">Blog Writing</h3>
                <p className="text-muted-foreground text-justify">
                  Crafting clear, comprehensive documentation and articles that
                  make complex technical concepts accessible to all readers.
                </p>
              </CardContent>
            </Card>

            <Card className="card-classic text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mx-auto mb-6 border border-primary/20">
                  <Cpu className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading mb-4">Building Electronic</h3>
                <p className="text-muted-foreground text-justify">
                  Designing and building connected devices and electronic
                  systems, bridging the gap between software and physical
                  computing.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Featured Writings */}
      <section className="py-20 bg-background">
        <div className="container max-w-4xl mx-auto px-6">
          <h2 className="text-center mb-4">Recent Writings</h2>
          <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto text-justify">
            Thoughts on technology, development practices, and the intersection
            of code and craftsmanship.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {latestPosts.length > 0 ? (
              latestPosts.map((post, index) => (
                <Card key={index} className="card-classic group">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="h-3 w-3" />
                      <span>{post.formattedDate}</span>
                    </div>

                    <h3 className="font-heading mb-4 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground text-justify mb-6 line-clamp-3">
                      {post.description}
                    </p>

                    <Button
                      asChild
                      variant="link"
                      className="p-0 gap-2 group-hover:gap-3 transition-all tracking-wide font-domine"
                    >
                      <Link
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Continue Reading
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              // Fallback content when no posts are available
              <>
                <Card className="card-classic group">
                  <CardContent className="p-8">
                    <h3 className="font-heading mb-4 group-hover:text-primary transition-colors">
                      Energy Monitoring System Calibration
                    </h3>
                    <p className="text-muted-foreground text-justify mb-6">
                      Improving DHT11 sensor accuracy through linear regression
                      calibration against HTC-1 reference measurements.
                    </p>
                    <Button
                      asChild
                      variant="link"
                      className="p-0 gap-2 group-hover:gap-3 transition-all tracking-wide font-domine"
                    >
                      <Link
                        href="https://dankehidayat.my.id/blog/energy-monitoring-calibration-linear-regression"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Continue Reading
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="card-classic group">
                  <CardContent className="p-8">
                    <h3 className="font-heading mb-4 group-hover:text-primary transition-colors">
                      Statistical Mechanics and Probability
                    </h3>
                    <p className="text-muted-foreground text-justify mb-6">
                      Connecting microscopic physics to macroscopic observations
                      through statistics and mathematical modeling.
                    </p>
                    <Button
                      asChild
                      variant="link"
                      className="p-0 gap-2 group-hover:gap-3 transition-all tracking-wide font-domine"
                    >
                      <Link
                        href="https://dankehidayat.my.id/blog/statistical-mechanics"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Continue Reading
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              variant="outline"
              className="btn-classic font-domine"
            >
              <Link
                href="https://dankehidayat.my.id/blog"
                target="_blank"
                rel="noopener noreferrer"
              >
                View All Writings
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
