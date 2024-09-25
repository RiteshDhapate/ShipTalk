import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  MessageSquareIcon,
  PackageIcon,
  TruckIcon,
  SearchIcon,
  HomeIcon,
  TrendingUpIcon,
  PlusCircleIcon,
  DollarSignIcon,
  ClockIcon,
  BotIcon,
  SendIcon,
  UserIcon,
  BellIcon,
  MenuIcon,
  BoxIcon,
  CalendarIcon,
  HashIcon,
  Flame,
  UsersIcon,
  VideoIcon,
} from "lucide-react";

const Comment = ({ comment }) => (
  <div className="flex items-start space-x-4 py-4">
    <Avatar className="w-10 h-10">
      <AvatarImage
        src={`https://api.dicebear.com/6.x/initials/svg?seed=${comment.author}`}
        alt={comment.author}
      />
      <AvatarFallback>{comment.author[0]}</AvatarFallback>
    </Avatar>
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-300">{comment.author}</p>
        <p className="text-xs text-gray-500">{comment.date}</p>
      </div>
      <p className="mt-1 text-sm text-gray-400">{comment.content}</p>
    </div>
  </div>
);

const ForumPost = ({ post: initialPost }) => {
  const [post, setPost] = useState(initialPost);
  const [newComment, setNewComment] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);

  const handleVote = (type) => {
    setPost((prevPost) => ({
      ...prevPost,
      upvotes: type === "up" ? prevPost.upvotes + 1 : prevPost.upvotes - 1,
    }));
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        content: newComment,
        author: "Anonymous User",
        date: new Date().toLocaleDateString(),
      };
      setPost((prevPost) => ({
        ...prevPost,
        comments: [...prevPost.comments, comment],
      }));
      setNewComment("");
    }
  };

  const displayedComments = showAllComments
    ? post.comments
    : post.comments.slice(0, 2);

  return (
    <Card className="mb-6 bg-gray-800 border-gray-700 hover:border-yellow-500 transition-colors">
      <CardContent className="pt-6">
        <div className="flex items-start space-x-4">
          <div className="flex flex-col items-center space-y-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleVote("up")}
              className="hover:bg-green-900 hover:text-green-400"
            >
              <ArrowUpIcon className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium text-gray-300">
              {post.upvotes}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleVote("down")}
              className="hover:bg-red-900 hover:text-red-400"
            >
              <ArrowDownIcon className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1 space-y-2">
            <h3 className="text-xl font-semibold text-gray-100">
              {post.title}
            </h3>
            <p className="text-sm text-gray-400">{post.content}</p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <MessageSquareIcon className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500">
                  {post.comments.length} comments
                </span>
              </div>
              <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                {post.category}
              </Badge>
            </div>
          </div>
        </div>
        <div className="mt-6 space-y-4">
          {displayedComments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
          {post.comments.length > 2 && (
            <Button
              variant="link"
              onClick={() => setShowAllComments(!showAllComments)}
              className="text-yellow-500 hover:text-yellow-400 p-0"
            >
              {showAllComments
                ? "Show less"
                : `Show all ${post.comments.length} comments`}
            </Button>
          )}
        </div>
        <form onSubmit={handleAddComment} className="mt-4">
          <Input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
          />
          <Button
            type="submit"
            className="mt-2 bg-yellow-500 text-gray-900 hover:bg-yellow-400"
          >
            Add Comment
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

const ForumFeed = ({ posts }) => (
  <div className="space-y-6">
    {posts.map((post, index) => (
      <ForumPost key={index} post={post} />
    ))}
  </div>
);

const AIAssistant = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setIsLoading(true);
      // Simulate AI response
      setTimeout(() => {
        setSelectedPost(aiResponse);
        setIsLoading(false);
      }, 2000);
      setQuery("");
    }
  };

  const aiResponse = {
    title: "Shipping Best Practices",
    content:
      "Based on our forum discussions, here are some key shipping best practices: Use appropriate packaging materials to reduce damages. Compare rates between carriers for different shipment types. Implement a multi-carrier strategy for cost optimization. Set up automated tracking alerts for proactive issue resolution. Consider eco-friendly packaging options to appeal to environmentally conscious customers. Optimize last-mile delivery by partnering with local businesses for pickup points. Utilize route optimization software to improve delivery efficiency. For international shipments, thoroughly research country-specific regulations and customs requirements. Regularly review and negotiate carrier contracts to ensure competitive rates. Invest in quality packaging to minimize damages and returns. Implement a robust tracking system to keep customers informed throughout the shipping process. Consider offering multiple shipping options to cater to different customer needs and preferences.",
    references: [
      { title: "Reducing shipping damages", id: "reduce-shipping-damages" },
      { title: "Carrier comparison strategies", id: "carrier-comparison" },
      { title: "Cost optimization techniques", id: "cost-optimization" },
      {
        title: "Effective tracking and communication",
        id: "tracking-communication",
      },
      { title: "Eco-friendly shipping solutions", id: "eco-friendly-shipping" },
    ],
  };

  return (
    <Card className="mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-none shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-white">
          <BotIcon className="w-8 h-8 text-yellow-300 animate-pulse" />
          <span className="text-3xl font-bold text-white">
            ShipTalk AI Assistant
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            type="text"
            placeholder="Ask a shipping question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow bg-white/20 text-white border-white/30 placeholder-indigo-200 focus:border-yellow-300 focus:ring-yellow-300"
          />
          <Button
            type="submit"
            size="icon"
            className="bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105"
            disabled={isLoading}
          >
            <SendIcon className="h-5 w-5" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardContent>
      {selectedPost && (
        <Dialog>
          <DialogTrigger asChild>
            <Card className="mt-4 bg-white/20 cursor-pointer hover:bg-white/30 transition-colors">
              <CardHeader>
                <CardTitle className="text-yellow-300">
                  {selectedPost.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/90">{selectedPost.content}</p>
                <div className="mt-4">
                  <p className="text-sm text-white/80">Related Discussions:</p>
                  <ul className="list-disc list-inside">
                    {selectedPost.references.map((ref, i) => (
                      <li
                        key={i}
                        className="text-yellow-300 hover:underline cursor-pointer"
                      >
                        {ref.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 text-gray-100">
            <DialogHeader>
              <DialogTitle className="text-yellow-500">
                {selectedPost.title}
              </DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <p>{selectedPost.content}</p>
              <div className="mt-4">
                <p className="font-semibold">Related Discussions:</p>
                <ul className="list-disc list-inside">
                  {selectedPost.references.map((ref, i) => (
                    <li
                      key={i}
                      className="text-yellow-500 hover:underline cursor-pointer"
                    >
                      {ref.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
};

const LiveDiscussions = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      author: "ShippingPro",
      content: "Has anyone tried the new eco-friendly packaging from GreenBox?",
    },
    {
      id: 2,
      author: "LogisticsGuru",
      content:
        "I'm seeing a lot of delays with international shipments lately. Any tips?",
    },
    {
      id: 3,
      author: "NewShipper",
      content:
        "What's the best way to handle returns for an e-commerce business?",
    },
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([
        ...messages,
        { id: Date.now(), author: "You", content: message },
      ]);
      setMessage("");
    }
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-gray-100">Live Discussions</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          {messages.map((msg) => (
            <div key={msg.id} className="mb-4">
              <p className="font-semibold text-gray-300">{msg.author}</p>
              <p className="text-gray-400">{msg.content}</p>
            </div>
          ))}
        </ScrollArea>
        <form onSubmit={handleSendMessage} className="mt-4 flex">
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Join the conversation..."
            className="flex-grow bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
          />
          <Button
            type="submit"
            className="ml-2 bg-yellow-500 text-gray-900 hover:bg-yellow-400"
          >
            Send
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

const TrendingGroups = () => {
  const topics = [
    { icon: BoxIcon, title: "Eco-Packaging", discussions: 128 },
    { icon: TruckIcon, title: "Last-Mile Innovation", discussions: 95 },
    { icon: DollarSignIcon, title: "Cost Optimization", discussions: 82 },
    { icon: ClockIcon, title: "Delivery Speed", discussions: 76 },
  ];

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-gray-100 flex items-center">
          <UsersIcon className="w-6 h-6 mr-2 text-yellow-500" />
          Trending Groups
        </CardTitle>
      </CardHeader>
      <CardContent>
        {topics.map((topic, index) => (
          <div
            key={index}
            className="flex items-center justify-between mb-4 last:mb-0"
          >
            <div className="flex items-center">
              <topic.icon className="w-6 h-6 text-yellow-500 mr-2" />
              <div>
                <p className="text-gray-300 font-medium">{topic.title}</p>
                <p className="text-sm text-gray-500">
                  {topic.discussions} discussions
                </p>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300 ease-in-out transform hover:scale-105">
                  Join
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 text-gray-100">
                <DialogHeader>
                  <DialogTitle className="text-yellow-500">
                    Join {topic.title} Group
                  </DialogTitle>
                </DialogHeader>
                <p>
                  Are you sure you want to join the {topic.title} group? You'll
                  receive notifications about new discussions and updates.
                </p>
                <DialogFooter>
                  <Button className="bg-yellow-500 text-gray-900 hover:bg-yellow-400">
                    Confirm
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

const ExpertCorner = () => {
  const experts = [
    {
      name: "Sarah Johnson",
      specialty: "International Logistics",
      isLive: true,
    },
    {
      name: "Mike Chen",
      specialty: "Supply Chain Optimization",
      isLive: false,
    },
    { name: "Elena Rodriguez", specialty: "Customs Regulations", isLive: true },
  ];

  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (showCamera) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((err) => console.error("Error accessing camera:", err));
    }
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, [showCamera]);

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-gray-100">Expert Corner</CardTitle>
      </CardHeader>
      <CardContent>
        {experts.map((expert, index) => (
          <div
            key={index}
            className="flex items-center justify-between mb-4 last:mb-0"
          >
            <div className="flex items-center">
              <Avatar className="w-10 h-10 mr-3">
                <AvatarImage
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${expert.name}`}
                  alt={expert.name}
                />
                <AvatarFallback>{expert.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-gray-300 font-medium">{expert.name}</p>
                <p className="text-sm text-gray-500">{expert.specialty}</p>
              </div>
            </div>
            {expert.isLive ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-green-500 to-blue-600 text-white hover:from-green-600 hover:to-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105">
                    <VideoIcon className="mr-2 h-4 w-4" />
                    Join Live
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-800 text-gray-100">
                  <DialogHeader>
                    <DialogTitle className="text-yellow-500">
                      Join Live Call with {expert.name}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="mt-4">
                    <p>
                      You're about to join a live video call with {expert.name}.
                      Please ensure your camera and microphone are working.
                    </p>
                    {showCamera && (
                      <div className="mt-4 relative w-full h-48 bg-gray-700 rounded-lg overflow-hidden">
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={() => setShowCamera(!showCamera)}
                      className="bg-blue-500 text-white hover:bg-blue-600 mr-2"
                    >
                      {showCamera ? "Hide Preview" : "Show Camera Preview"}
                    </Button>
                    <Button className="bg-green-500 text-white hover:bg-green-600">
                      Join Call
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300 ease-in-out transform hover:scale-105">
                    Schedule
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-800 text-gray-100">
                  <DialogHeader>
                    <DialogTitle className="text-yellow-500">
                      Schedule a Call with {expert.name}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="mt-4">
                    <p>
                      Select a date and time to schedule a video call with{" "}
                      {expert.name}:
                    </p>
                    <Input
                      type="datetime-local"
                      className="mt-2 bg-gray-700 text-gray-100 border-gray-600"
                    />
                  </div>
                  <DialogFooter>
                    <Button className="bg-yellow-500 text-gray-900 hover:bg-yellow-400">
                      Confirm Booking
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

const VirtualEventSpace = () => {
  const events = [
    {
      title: "Future of Last-Mile Delivery",
      date: "June 15, 2023 at 2:00 PM EST",
    },
    {
      title: "Sustainability in Shipping",
      date: "June 18, 2023 at 11:00 AM EST",
    },
  ];

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-gray-100">Virtual Event Space</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upcoming">
          <TabsList className="bg-gray-700 text-gray-400">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="live">Live Now</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming">
            {events.map((event, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <p className="text-gray-300 font-medium">{event.title}</p>
                <p className="text-sm text-gray-500">{event.date}</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="mt-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300 ease-in-out transform hover:scale-105">
                      RSVP
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-800 text-gray-100">
                    <DialogHeader>
                      <DialogTitle className="text-yellow-500">
                        RSVP for {event.title}
                      </DialogTitle>
                    </DialogHeader>
                    <p>
                      Would you like to RSVP for {event.title} on {event.date}?
                    </p>
                    <DialogFooter>
                      <Button className="bg-yellow-500 text-gray-900 hover:bg-yellow-400">
                        Confirm RSVP
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="live">
            <p className="text-gray-400">
              No live events at the moment. Check back soon!
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

const samplePosts = [
  {
    title: "UPS vs FedEx for international B2B shipments",
    content:
      "I'm looking to expand my business internationally and I'm torn between UPS and FedEx for B2B shipments. Any experiences or recommendations?",
    upvotes: 24,
    category: "Carrier Comparison",
    comments: [
      {
        id: 1,
        content:
          "I've had great experiences with UPS for international shipments. Their tracking is top-notch.",
        author: "ShippingPro",
        date: "2023-06-15",
      },
      {
        id: 2,
        content:
          "FedEx has better rates for heavier packages in my experience.",
        author: "LogisticsGuru",
        date: "2023-06-16",
      },
      {
        id: 3,
        content:
          "It really depends on the specific countries you're shipping to. I'd recommend getting quotes for your most common routes.",
        author: "GlobalTrader",
        date: "2023-06-17",
      },
    ],
  },
  {
    title: "Best practices for reducing shipping damages",
    content:
      "We've been experiencing an increase in shipping damages lately. What are some best practices you've implemented to reduce damages during transit?",
    upvotes: 18,
    category: "Packaging",
    comments: [
      {
        id: 1,
        content:
          "Double boxing has significantly reduced our damage rates for fragile items.",
        author: "CarefulShipper",
        date: "2023-06-14",
      },
      {
        id: 2,
        content:
          "We started using custom foam inserts and haven't looked back. It's a bit more expensive but worth it.",
        author: "QualityFirst",
        date: "2023-06-15",
      },
    ],
  },
  {
    title: "New USPS rates impact on small businesses",
    content:
      "The new USPS rates are out. How are other small businesses adapting to these changes? Are you considering switching carriers?",
    upvotes: 31,
    category: "Cost Optimization",
    comments: [
      {
        id: 1,
        content:
          "We're looking into regional carriers for some of our shipments now. The USPS increases are hitting us hard.",
        author: "SmallBizOwner",
        date: "2023-06-13",
      },
      {
        id: 2,
        content:
          "We've started offering local pickup options to offset some of the shipping costs.",
        author: "AdaptiveEntrepreneur",
        date: "2023-06-14",
      },
      {
        id: 3,
        content:
          "Considering a switch to UPS SurePost for lighter packages. Anyone have experience with this?",
        author: "ShippingNewbie",
        date: "2023-06-15",
      },
    ],
  },
  {
    title: "Eco-friendly packaging solutions for e-commerce",
    content:
      "As a small e-commerce business, we're looking to transition to more sustainable packaging. What eco-friendly options have you found effective?",
    upvotes: 42,
    category: "Eco-Packaging",
    comments: [
      {
        id: 1,
        content:
          "We've had great success with compostable mailers for smaller items. Our customers love them!",
        author: "GreenShipper",
        date: "2023-06-18",
      },
      {
        id: 2,
        content:
          "Recycled cardboard boxes with water-activated paper tape have been our go-to for larger items.",
        author: "SustainableSender",
        date: "2023-06-19",
      },
    ],
  },
  {
    title: "Strategies for optimizing last-mile delivery",
    content:
      "Last-mile delivery costs are eating into our profits. What strategies have you implemented to optimize this part of the shipping process?",
    upvotes: 37,
    category: "Last-Mile Innovation",
    comments: [
      {
        id: 1,
        content:
          "We've partnered with local businesses to set up pickup points. It's reduced our costs significantly.",
        author: "InnovativeLogistics",
        date: "2023-06-20",
      },
      {
        id: 2,
        content:
          "Implementing route optimization software has helped us plan more efficient delivery routes.",
        author: "TechSavvyShipper",
        date: "2023-06-21",
      },
    ],
  },
  {
    title: "Improving delivery speed without breaking the bank",
    content:
      "Our customers are demanding faster shipping times, but expedited shipping is costly. How are you balancing speed and cost?",
    upvotes: 29,
    category: "Delivery Speed",
    comments: [
      {
        id: 1,
        content:
          "We've started using regional carriers for certain areas. They often offer faster delivery at lower costs.",
        author: "SpeedyShipper",
        date: "2023-06-22",
      },
      {
        id: 2,
        content:
          "Implementing a multi-warehouse strategy has helped us get products closer to customers before they even order.",
        author: "StrategicSender",
        date: "2023-06-23",
      },
    ],
  },
];

export default function ModernShippingForum() {
  const [activeTab, setActiveTab] = useState("feed");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState(samplePosts);

  const handleTopicClick = (topic) => {
    setActiveTab("feed");
    setFilteredPosts(samplePosts.filter((post) => post.category === topic));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <header className="sticky top-0 z-40 w-full border-b border-gray-700 bg-gray-800 backdrop-blur supports-[backdrop-filter]:bg-gray-800/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="#" className="flex items-center space-x-2">
                <PackageIcon className="h-8 w-8 text-yellow-500" />
                <span className="text-2xl font-bold text-yellow-500">
                  ShipTalk
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:block">
                <Input
                  placeholder="Search discussions..."
                  className="w-64 bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
                />
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="text-gray-300 hover:text-yellow-500"
              >
                <BellIcon className="h-5 w-5" />
              </Button>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="ghost"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <MenuIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-3 space-y-6">
              <div className="sticky top-24">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-gray-100 flex items-center">
                      <HashIcon className="w-6 h-6 mr-2 text-yellow-500" />
                      Topics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <nav className="space-y-2">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-300 hover:text-yellow-500 hover:bg-gray-700"
                        onClick={() => setFilteredPosts(samplePosts)}
                      >
                        <HomeIcon className="mr-2 h-4 w-4" />
                        All Posts
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-300 hover:text-yellow-500 hover:bg-gray-700"
                        onClick={() => handleTopicClick("Carrier Comparison")}
                      >
                        <TruckIcon className="mr-2 h-4 w-4" />
                        Carrier Comparison
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-300 hover:text-yellow-500 hover:bg-gray-700"
                        onClick={() => handleTopicClick("Packaging")}
                      >
                        <PackageIcon className="mr-2 h-4 w-4" />
                        Packaging
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-300 hover:text-yellow-500 hover:bg-gray-700"
                        onClick={() => handleTopicClick("Cost Optimization")}
                      >
                        <DollarSignIcon className="mr-2 h-4 w-4" />
                        Cost Optimization
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-300 hover:text-yellow-500 hover:bg-gray-700"
                        onClick={() => handleTopicClick("Eco-Packaging")}
                      >
                        <BoxIcon className="mr-2 h-4 w-4" />
                        Eco-Packaging
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-300 hover:text-yellow-500 hover:bg-gray-700"
                        onClick={() => handleTopicClick("Last-Mile Innovation")}
                      >
                        <TruckIcon className="mr-2 h-4 w-4" />
                        Last-Mile Innovation
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-300 hover:text-yellow-500 hover:bg-gray-700"
                        onClick={() => handleTopicClick("Delivery Speed")}
                      >
                        <ClockIcon className="mr-2 h-4 w-4" />
                        Delivery Speed
                      </Button>
                    </nav>
                  </CardContent>
                </Card>
                <div className="mt-6">
                  <TrendingGroups />
                </div>
              </div>
            </div>
            <div className="lg:col-span-6">
              <AIAssistant />
              <Tabs defaultValue="all" className="mb-6">
                <TabsList className="bg-gray-800 text-gray-400">
                  <TabsTrigger value="all">All Posts</TabsTrigger>
                  <TabsTrigger value="hot">Hot</TabsTrigger>
                  <TabsTrigger value="new">New</TabsTrigger>
                  <TabsTrigger value="live">Live Discussion</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                  <ForumFeed posts={filteredPosts} />
                </TabsContent>
                <TabsContent value="hot">
                  <ForumFeed
                    posts={filteredPosts.filter((post) => post.upvotes > 20)}
                  />
                </TabsContent>
                <TabsContent value="new">
                  <ForumFeed
                    posts={filteredPosts.sort(
                      (a, b) =>
                        new Date(b.comments[0].date) -
                        new Date(a.comments[0].date)
                    )}
                  />
                </TabsContent>
                <TabsContent value="live">
                  <LiveDiscussions />
                </TabsContent>
              </Tabs>
            </div>
            <div className="lg:col-span-3 space-y-6">
              <div className="sticky top-24">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-gray-100">
                      Create a Post
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <Input
                        placeholder="Title"
                        className="bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
                      />
                      <Textarea
                        placeholder="What's on your mind?"
                        className="min-h-[100px] bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
                      />
                      <Button className="w-full bg-yellow-500 text-gray-900 hover:bg-yellow-400">
                        Post
                      </Button>
                    </form>
                  </CardContent>
                </Card>
                <div className="mt-6">
                  <ExpertCorner />
                </div>
                <div className="mt-6">
                  <VirtualEventSpace />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
