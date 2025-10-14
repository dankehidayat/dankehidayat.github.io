// app/experience/page.tsx
import { MapPin, Briefcase, GraduationCap } from "lucide-react";

// All items combined with full dates and sorted by date (newest to oldest)
const timelineItems = [
  {
    title: "Junior Software Developer",
    organization: "PT. Labdha Teknika Nusantara",
    location: "Bandung, Indonesia",
    period: "Present",
    startDate: new Date(2025, 0, 1), // January 2025
    endDate: null,
    type: "work",
    icon: <Briefcase className="h-4 w-4" />,
    tag: "Work",
  },
  {
    title: "Data Analyst",
    organization: "PT. Global Kreatif Inovasi",
    location: "South Jakarta, Indonesia",
    period: "Dec 2024 - Jan 2025",
    startDate: new Date(2024, 11, 1), // December 2024
    endDate: new Date(2025, 1, 30), // January 2025
    type: "internship",
    icon: <Briefcase className="h-4 w-4" />,
    tag: "Internship",
  },
  {
    title: "Software Tester",
    organization: "PT. Global Kreatif Inovasi",
    location: "South Jakarta, Indonesia",
    period: "Jun 2024 - Nov 2024",
    startDate: new Date(2024, 5, 1), // June 2024
    endDate: new Date(2024, 10, 30), // November 2024
    type: "internship",
    icon: <Briefcase className="h-4 w-4" />,
    tag: "Internship",
  },
  {
    title: "Bachelor of Applied Technology in Computer Engineering",
    organization: "Vocational School of IPB University",
    location: "Bogor, West Java, Indonesia",
    period: "Aug 2021 - Expected Jun 2025",
    startDate: new Date(2021, 7, 1), // August 2021
    endDate: new Date(2025, 5, 30), // June 2025
    type: "education",
    icon: <GraduationCap className="h-4 w-4" />,
    tag: "Education",
  },
  {
    title: "Assistant IT Officer",
    organization: "Wyndham Hotel Casablanca",
    location: "South Jakarta, Indonesia",
    period: "Mar 2020 - Feb 2021",
    startDate: new Date(2020, 2, 1), // March 2020
    endDate: new Date(2021, 1, 28), // February 2021
    type: "internship",
    icon: <Briefcase className="h-4 w-4" />,
    tag: "Internship",
  },
  {
    title: "Computer and Network Engineering",
    organization: "SMKN 2",
    location: "Depok, West Java, Indonesia",
    period: "Jul 2018 - Jun 2021",
    startDate: new Date(2018, 6, 1), // July 2018
    endDate: new Date(2021, 5, 30), // June 2021
    type: "education",
    icon: <GraduationCap className="h-4 w-4" />,
    tag: "Education",
  },
];

// Format date to display as "Month Year"
const formatDate = (date: Date | null): string => {
  if (!date) return "";
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

// Format period display with full dates - mobile optimized
const formatPeriod = (
  startDate: Date,
  endDate: Date | null,
  isMobile: boolean = false
): string => {
  const start = formatDate(startDate);
  const end = endDate ? formatDate(endDate) : "Present";

  if (isMobile) {
    // For mobile, use shorter format or break into two lines
    if (end === "Present") {
      return `${start} - ${end}`;
    }
    // For mobile, you might want to show just years if dates are too long
    const startYear = startDate.getFullYear();
    const endYear = endDate ? endDate.getFullYear() : "Present";

    // Use full date format only if it fits well, otherwise use years
    const fullDateLength = `${start} - ${end}`.length;
    if (fullDateLength <= 20) {
      return `${start} - ${end}`;
    } else {
      return `${startYear} - ${endYear}`;
    }
  }

  // Desktop format
  if (end === "Present") {
    return `${start} - ${end}`;
  }
  return `${start} - ${end}`;
};

// Mobile-specific date formatting
const formatMobileDate = (startDate: Date, endDate: Date | null): string => {
  const start = startDate.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  const end = endDate
    ? endDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })
    : "Present";

  // For very long date ranges, use a more compact format
  const dateString = `${start} - ${end}`;
  if (dateString.length > 25) {
    const startYear = startDate.getFullYear();
    const endYear = endDate ? endDate.getFullYear() : "Present";
    return `${startYear} - ${endYear}`;
  }

  return dateString;
};

export default function Experience() {
  // Sort items by start date (newest first)
  const sortedItems = [...timelineItems].sort((a, b) => {
    // For items with no end date (current), put them at the top
    if (!a.endDate && b.endDate) return -1;
    if (a.endDate && !b.endDate) return 1;

    // Sort by start date descending (newest first)
    return b.startDate.getTime() - a.startDate.getTime();
  });

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="mb-6">Career & Education</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            My journey through education and professional experiences in
            chronological order.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-4 sm:left-6 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-border z-0 timeline-line"></div>

          {/* Timeline Items */}
          <div className="space-y-8 sm:space-y-12">
            {sortedItems.map((item, index) => (
              <div
                key={index}
                className="relative flex items-center w-full timeline-item"
              >
                {/* Timeline Dot */}
                <div
                  className={`absolute left-4 sm:left-6 md:left-1/2 transform md:-translate-x-1/2 w-3 h-3 rounded-full border-2 border-background z-10 timeline-dot`}
                ></div>

                {/* Date - Desktop (left side) */}
                <div className="hidden md:flex md:w-2/5 items-center justify-end pr-8">
                  <div className="bg-muted px-4 py-2 rounded-lg border border-border min-w-[140px] text-center">
                    <span className="text-sm font-domine font-medium text-muted-foreground timeline-date">
                      {formatPeriod(item.startDate, item.endDate, false)}
                    </span>
                  </div>
                </div>

                {/* Content Card - Consistent width on mobile */}
                <div className="ml-10 sm:ml-12 md:ml-0 md:w-3/5 w-full bg-card border border-border rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                  {/* Header with Tag and Mobile Date */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded text-xs font-domine font-medium w-fit ${
                            item.type === "work"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              : item.type === "internship"
                              ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                              : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          }`}
                        >
                          {item.icon}
                          <span className="ml-1">{item.tag}</span>
                        </span>

                        {/* Mobile Date - Better positioning */}
                        <div className="md:hidden bg-muted px-3 py-1 rounded border border-border w-fit">
                          <span className="text-xs font-domine font-medium text-muted-foreground timeline-date">
                            {formatMobileDate(item.startDate, item.endDate)}
                          </span>
                        </div>
                      </div>

                      {/* Position Title - Larger and bolder on bigger screens */}
                      <h3 className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-foreground leading-tight">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Organization and Location */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-foreground/80">
                      <span
                        className="font-domine font-medium text-base sm:text-lg"
                        style={{ fontStyle: "normal" }}
                      >
                        {item.organization}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm sm:text-base text-muted-foreground">
                      <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span className="break-words">{item.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
