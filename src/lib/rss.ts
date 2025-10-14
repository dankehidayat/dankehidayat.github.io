import { XMLParser } from "fast-xml-parser";

export interface BlogPost {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  formattedDate: string;
}

export async function getLatestPosts(limit: number = 2): Promise<BlogPost[]> {
  try {
    const feedUrl =
      process.env.RSS_FEED_URL || "https://dankehidayat.my.id/rss.xml";
    console.log("Fetching RSS feed from:", feedUrl);

    const response = await fetch(feedUrl, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch RSS feed: ${response.status} ${response.statusText}`
      );
    }

    const xmlText = await response.text();

    // Use fast-xml-parser instead of DOMParser
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
    });

    const result = parser.parse(xmlText);

    // Extract items from RSS feed
    const items = result.rss?.channel?.item || result.feed?.entry || [];
    console.log(
      `Found ${Array.isArray(items) ? items.length : 1} items in RSS feed`
    );

    const posts: BlogPost[] = [];
    const itemsArray = Array.isArray(items) ? items : [items];

    for (let i = 0; i < Math.min(itemsArray.length, limit); i++) {
      const item = itemsArray[i];

      const title = item.title?.trim() || "Untitled";
      const description =
        item.description?.trim() ||
        item.summary?.trim() ||
        "No description available";
      const link = item.link?.trim() || item.id?.trim() || "/blog";
      const pubDate =
        item.pubDate?.trim() ||
        item.published?.trim() ||
        item.updated?.trim() ||
        new Date().toISOString();

      const formattedDate = new Date(pubDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      posts.push({
        title,
        description,
        link,
        pubDate,
        formattedDate,
      });
    }

    console.log("Successfully parsed", posts.length, "posts");
    return posts;
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
    // Return fallback posts if RSS fetch fails
    return getFallbackPosts(limit);
  }
}

function getFallbackPosts(limit: number): BlogPost[] {
  const fallbackPosts = [
    {
      title:
        "Energy Monitoring System Calibration: Linear Regression Approach for Sensor Accuracy",
      description:
        "Improving DHT11 sensor accuracy through linear regression calibration against HTC-1 reference measurements, achieving 0.8°C MAE in temperature and 1.15% MAE in humidity readings.",
      link: "https://dankehidayat.my.id/blog/energy-monitoring-calibration-linear-regression",
      pubDate: "2025-10-14",
      formattedDate: "Oct 14, 2025",
    },
    {
      title: "Statistical Mechanics and Probability",
      description:
        "Connecting microscopic physics to macroscopic observations through statistics.",
      link: "https://dankehidayat.my.id/blog/statistical-mechanics",
      pubDate: "2024-03-15",
      formattedDate: "Mar 15, 2024",
    },
  ];

  return fallbackPosts.slice(0, limit);
}
