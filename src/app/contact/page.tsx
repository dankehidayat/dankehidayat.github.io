// app/contact/page.tsx
import {
  Mail,
  Github,
  Linkedin,
  Instagram,
  FileText,
  ExternalLink,
  Bird,
} from "lucide-react";

const socialLinks = [
  {
    name: "Email",
    url: "mailto:contact@dankehidayat.my.id",
    icon: Mail,
    description: "Get in touch directly",
    username: "contact@dankehidayat.my.id",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  },
  {
    name: "GitHub",
    url: "https://github.com/dankehidayat",
    icon: Github,
    description: "Check out my projects and code",
    username: "@dankehidayat",
    color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/dankehidayat",
    icon: Linkedin,
    description: "Professional network and experience",
    username: "in/dankehidayat",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  },
  {
    name: "Bluesky",
    url: "https://bsky.app/profile/dankehidayat.my.id",
    icon: Bird,
    description: "Thoughts and updates",
    username: "@dankehidayat.my.id",
    color: "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200",
  },
  {
    name: "Instagram",
    url: "https://instagram.com/dankehidayat",
    icon: Instagram,
    description: "Personal life and moments",
    username: "@dankehidayat",
    color: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  },
];

const resumeLink = {
  url: "/resume.pdf", // Update this path to your actual resume file
  label: "Download Resume",
};

export default function Contact() {
  return (
    <div className="min-h-screen bg-background py-12 contact-page">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="mb-6">Get In Touch</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            I&apos;m always open to discussing new opportunities,
            collaborations, or just having a good conversation about technology
            and innovation.
          </p>
        </div>

        {/* Resume Download Section */}
        <section className="mb-16 text-center">
          <div
            className="bg-card border border-border rounded-lg p-8 shadow-sm contact-item"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex flex-col items-center gap-4">
              <FileText className="h-12 w-12 text-primary" />
              <h2 className="text-2xl font-heading font-bold text-foreground">
                My Resume
              </h2>
              <p className="text-muted-foreground max-w-md">
                Download my complete resume to learn more about my experience,
                skills, and professional background.
              </p>
              <a
                href={resumeLink.url}
                download
                className="inline-flex items-center gap-2 px-6 py-3 project-btn-solid rounded-lg transition-colors text-base font-domine mt-4"
              >
                <FileText className="h-5 w-5" />
                {resumeLink.label}
              </a>
            </div>
          </div>
        </section>

        {/* Social Media Links */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading mb-4">Connect With Me</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find me on these platforms. I&apos;m most active on GitHub and
              LinkedIn for professional discussions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 group contact-item"
                  style={{
                    animationDelay: `${0.2 + index * 0.1}s`,
                  }}
                >
                  <div className="flex flex-col items-center text-center gap-4">
                    <div
                      className={`p-3 rounded-full ${social.color} group-hover:scale-110 transition-transform duration-200`}
                    >
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                        {social.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        {social.description}
                      </p>
                      <div className="flex items-center justify-center gap-2 text-sm text-primary font-domine">
                        <span>{social.username}</span>
                        <ExternalLink className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* Contact Information */}
        <section
          className="bg-muted rounded-lg p-8 contact-item"
          style={{ animationDelay: "0.8s" }}
        >
          <div className="text-center">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              Preferred Contact Method
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              For professional inquiries and collaboration opportunities, email
              is the best way to reach me. I typically respond within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:contact@dankehidayat.my.id"
                className="inline-flex items-center gap-2 px-6 py-3 project-btn-solid rounded-lg transition-colors text-base font-domine"
              >
                <Mail className="h-5 w-5" />
                Send Email
              </a>
              <span className="text-muted-foreground">or</span>
              <a
                href="https://linkedin.com/in/dankehidayat"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 project-btn-outline rounded-lg transition-colors text-base font-domine"
              >
                <Linkedin className="h-5 w-5" />
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </section>

        {/* Quick Links Footer */}
        <section
          className="mt-16 text-center contact-item"
          style={{ animationDelay: "0.9s" }}
        >
          <div className="border-t border-border pt-8">
            <p className="text-muted-foreground mb-4">
              Looking for something specific?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://dankehidayat.my.id/projects"
                className="text-primary hover:text-primary/80 transition-colors font-domine"
              >
                View Projects
              </a>
              <span className="text-muted-foreground">•</span>
              <a
                href="https://dankehidayat.my.id/experience"
                className="text-primary hover:text-primary/80 transition-colors font-domine"
              >
                Work Experience
              </a>
              <span className="text-muted-foreground">•</span>
              <a
                href="https://dankehidayat.my.id/blog"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors font-domine"
              >
                Read Blog
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
