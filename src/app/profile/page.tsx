"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Link as LinkIcon,
  Github,
  Twitter,
  Linkedin,
  Upload,
  Save,
  RotateCcw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    bio: "Full-stack developer with 5 years of experience in React, Node.js, and cloud technologies. Passionate about building scalable applications and learning new technologies.",
    occupation: "Senior Software Engineer",
    company: "Tech Corp",
    website: "https://johndoe.dev",
    github: "github.com/johndoe",
    twitter: "twitter.com/johndoe",
    linkedin: "linkedin.com/in/johndoe",
    skills: ["React", "Node.js", "JavaScript", "TypeScript"],
    experience: [
      {
        title: "Senior Software Engineer",
        company: "Tech Corp",
        startDate: "2020-01-01",
        endDate: "Present",
        description:
          "Working on scalable web applications using React and Node.js.",
      },
    ],
  });

  const [originalData, setOriginalData] = useState({ ...profileData });
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveChanges = () => {
    setOriginalData({ ...profileData });
    setIsEditing(false);
  };

  const handleCancelChanges = () => {
    setProfileData({ ...originalData });
    setIsEditing(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="edit">Edit Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="w-full max-w-4xl mx-auto shadow-md">
            <CardHeader className="pb-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20 border-2 border-primary/10">
                    <AvatarImage
                      src="/api/placeholder/150/150"
                      alt={profileData.name}
                    />
                    <AvatarFallback className="text-xl font-bold">
                      {getInitials(profileData.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl">
                      {profileData.name}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {profileData.occupation} at {profileData.company}
                    </CardDescription>
                  </div>
                </div>
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6 pb-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <span>{profileData.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <span>{profileData.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <span>{profileData.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Briefcase className="h-5 w-5 text-muted-foreground" />
                      <span>{profileData.company}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Social Links</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <LinkIcon className="h-5 w-5 text-muted-foreground" />
                      <a
                        href={profileData.website}
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Personal Website
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Github className="h-5 w-5 text-muted-foreground" />
                      <a
                        href={`https://${profileData.github}`}
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Twitter className="h-5 w-5 text-muted-foreground" />
                      <a
                        href={`https://${profileData.twitter}`}
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Twitter
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Linkedin className="h-5 w-5 text-muted-foreground" />
                      <a
                        href={`https://${profileData.linkedin}`}
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-2">About</h3>
                <p className="text-muted-foreground">{profileData.bio}</p>
              </div>

              <div className="mt-8 pb-10">
                <h3 className="text-lg font-semibold mb-2">Experience</h3>
                <div className="space-y-4">
                  {profileData.experience.map((exp, index) => (
                    <div key={index} className="space-y-1">
                      <h4 className="font-semibold">{exp.title}</h4>
                      <p className="text-muted-foreground">{exp.company}</p>
                      <p className="text-sm text-muted-foreground">
                        {exp.startDate} - {exp.endDate}
                      </p>
                      <p className="text-muted-foreground">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="edit">
          <Card className="w-full max-w-4xl mx-auto shadow-md">
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
              <CardDescription>
                Update your profile information below
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-center mb-4">
                <div className="text-center">
                  <Avatar className="h-24 w-24 mx-auto mb-4 border-2 border-primary/10">
                    <AvatarImage
                      src="/api/placeholder/150/150"
                      alt={profileData.name}
                    />
                    <AvatarFallback className="text-xl font-bold">
                      {getInitials(profileData.name)}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Upload className="h-4 w-4" />
                    Upload Photo
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) =>
                        setProfileData({ ...profileData, name: e.target.value })
                      }
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          email: e.target.value,
                        })
                      }
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          phone: e.target.value,
                        })
                      }
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          location: e.target.value,
                        })
                      }
                      placeholder="City, Country"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="occupation">Occupation</Label>
                    <Input
                      id="occupation"
                      value={profileData.occupation}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          occupation: e.target.value,
                        })
                      }
                      placeholder="Your job title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={profileData.company}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          company: e.target.value,
                        })
                      }
                      placeholder="Your company name"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">About You</h3>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) =>
                      setProfileData({ ...profileData, bio: e.target.value })
                    }
                    placeholder="Tell us about yourself"
                    className="min-h-32"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Experience</h3>
                {profileData.experience.map((exp, index) => (
                  <div key={index} className="space-y-2">
                    <Input
                      value={exp.title}
                      onChange={(e) => {
                        const newExperience = [...profileData.experience];
                        newExperience[index].title = e.target.value;
                        setProfileData({
                          ...profileData,
                          experience: newExperience,
                        });
                      }}
                      placeholder="Job Title"
                    />
                    <Input
                      value={exp.company}
                      onChange={(e) => {
                        const newExperience = [...profileData.experience];
                        newExperience[index].company = e.target.value;
                        setProfileData({
                          ...profileData,
                          experience: newExperience,
                        });
                      }}
                      placeholder="Company"
                    />
                    <Input
                      value={exp.startDate}
                      onChange={(e) => {
                        const newExperience = [...profileData.experience];
                        newExperience[index].startDate = e.target.value;
                        setProfileData({
                          ...profileData,
                          experience: newExperience,
                        });
                      }}
                      placeholder="Start Date"
                    />
                    <Input
                      value={exp.endDate}
                      onChange={(e) => {
                        const newExperience = [...profileData.experience];
                        newExperience[index].endDate = e.target.value;
                        setProfileData({
                          ...profileData,
                          experience: newExperience,
                        });
                      }}
                      placeholder="End Date"
                    />
                    <Textarea
                      value={exp.description}
                      onChange={(e) => {
                        const newExperience = [...profileData.experience];
                        newExperience[index].description = e.target.value;
                        setProfileData({
                          ...profileData,
                          experience: newExperience,
                        });
                      }}
                      placeholder="Description"
                    />
                  </div>
                ))}
                <Button
                  onClick={() =>
                    setProfileData({
                      ...profileData,
                      experience: [
                        ...profileData.experience,
                        {
                          title: "",
                          company: "",
                          startDate: "",
                          endDate: "",
                          description: "",
                        },
                      ],
                    })
                  }
                >
                  Add Experience
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Social Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={profileData.website}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          website: e.target.value,
                        })
                      }
                      placeholder="https://yourwebsite.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                      id="github"
                      value={profileData.github}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          github: e.target.value,
                        })
                      }
                      placeholder="github.com/username"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      id="twitter"
                      value={profileData.twitter}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          twitter: e.target.value,
                        })
                      }
                      placeholder="twitter.com/username"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={profileData.linkedin}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          linkedin: e.target.value,
                        })
                      }
                      placeholder="linkedin.com/in/username"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-3">
              <Button
                className="w-full sm:w-auto gap-2"
                onClick={handleSaveChanges}
              >
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
              <Button
                variant="outline"
                className="w-full sm:w-auto gap-2"
                onClick={handleCancelChanges}
              >
                <RotateCcw className="h-4 w-4" />
                Cancel
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
