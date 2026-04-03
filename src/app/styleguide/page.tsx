import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Toggle } from "@/components/ui/toggle";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Kbd } from "@/components/ui/kbd";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Section, Container, SectionHeader } from "@/components/ui/Section";
import { ScrollReveal, StaggerChildren } from "@/components/ui/ScrollReveal";
import {
  ArrowRight,
  Zap,
  Settings,
  LogOut,
  User,
  Plus,
  Minus,
  Bold,
  Italic,
  Underline,
  Search,
  Bell,
  AlertCircle,
  Info,
  ChevronDown,
  ExternalLink,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Styleguide — Furma.tech",
  description: "Design system and UI components for Furma.tech.",
};

export default function StyleguidePage() {
  return (
    <TooltipProvider>
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background pb-20">
      {/* Header */}
      <Section variant="dark" className="pt-32 pb-20">
        <Container size="full">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-background text-foreground mb-8">
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em]">System v2.0</span>
            </div>
            <h1 className="font-serif text-[clamp(48px,8vw,96px)] font-semibold leading-[0.95] tracking-tight mb-8">
              Design<br />
              <span className="italic font-normal opacity-50">Styleguide.</span>
            </h1>
            <p className="text-[18px] sm:text-[20px] text-background/60 max-w-2xl leading-relaxed">
              A minimalist, high-end monochrome design system built for speed,
              sovereignty, and professional-grade SaaS tools.
            </p>
          </ScrollReveal>
        </Container>
      </Section>

      {/* ——— 01 / Typography ——— */}
      <Section id="typography">
        <Container size="full">
          <SectionHeader
            label="01 / Foundation"
            title="Typography"
            description="Our type system uses Syne for UI, Cormorant for expressive headlines, and JetBrains Mono for data."
          />

          <div className="space-y-16 mt-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
              <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest pt-2">Serif Headlines</div>
              <div className="md:col-span-3 space-y-8">
                <h1 className="font-serif text-6xl font-semibold tracking-tight">Headline H1 (60px)</h1>
                <h2 className="font-serif text-5xl font-semibold tracking-tight">Headline H2 (48px)</h2>
                <h3 className="font-serif text-4xl font-semibold tracking-tight">Headline H3 (36px)</h3>
                <h4 className="font-serif text-3xl font-semibold tracking-tight italic">Headline H4 (30px) — Italic</h4>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
              <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest pt-2">Sans UI Text</div>
              <div className="md:col-span-3 space-y-8">
                <div className="space-y-2">
                  <div className="text-xl font-bold tracking-tight">Bold UI Text (20px)</div>
                  <p className="text-grey-600 dark:text-grey-400 max-w-xl leading-relaxed">
                    The quick brown fox jumps over the lazy dog. This is our primary UI font (Syne).
                    It&apos;s designed to be clean, geometric, and modern.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium uppercase tracking-widest">Small Caps Label (14px)</div>
                  <p className="text-sm text-grey-500 leading-relaxed max-w-xl">
                    Secondary text and descriptive labels use a smaller scale with increased tracking
                    for legibility in professional interfaces.
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
              <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest pt-2">Mono Data</div>
              <div className="md:col-span-3 space-y-4">
                <div className="font-mono text-sm bg-grey-50 dark:bg-grey-900 p-4 border border-border">
                  {`const system = "Furma.tech";`},<br />
                  {`console.log(\`Welcome to \${system}\`);`}
                </div>
                <p className="font-mono text-[11px] text-grey-500 uppercase tracking-tighter">
                  Monospace is used for technical data, status labels, and code blocks.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ——— 02 / Colors ——— */}
      <Section variant="grey">
        <Container size="full">
          <SectionHeader
            label="02 / Foundation"
            title="Color Palette"
            description="Strictly monochrome. We use oklch color space for perfect perceptual balance between light and dark modes."
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 mt-12">
            {[
              { name: "Background", cls: "bg-background", text: "text-foreground", border: "border-border" },
              { name: "Foreground", cls: "bg-foreground", text: "text-background", border: "border-foreground" },
              { name: "Card", cls: "bg-card", text: "text-card-foreground", border: "border-border" },
              { name: "Secondary", cls: "bg-secondary", text: "text-foreground", border: "border-border" },
              { name: "Muted", cls: "bg-muted", text: "text-muted-foreground", border: "border-border" },
              { name: "Accent", cls: "bg-accent", text: "text-accent-foreground", border: "border-border" },
            ].map(color => (
              <div key={color.name} className="space-y-3">
                <div className={`h-20 w-full border ${color.cls} flex items-center justify-center font-bold text-[10px] uppercase tracking-widest ${color.text}`}>
                  {color.name}
                </div>
                <div className="font-mono text-[9px] text-grey-500 uppercase tracking-widest">{color.name}</div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest mb-4">Grey Scale</div>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(step => (
                <div key={step} className="space-y-2">
                  <div className={`h-12 w-full bg-grey-${step} border border-border/50`}></div>
                  <div className="font-mono text-[8px] text-grey-400 text-center">{step}</div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ——— 03 / Buttons ——— */}
      <Section>
        <Container size="full">
          <SectionHeader
            label="03 / Components"
            title="Buttons"
            description="Primary interaction points with tracked variants and sizes."
          />

          <div className="space-y-12 mt-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
              <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest">Variants</div>
              <div className="md:col-span-3 flex flex-wrap gap-3">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="premium">Premium</Button>
                <Button variant="dark">Dark</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
              <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest">Sizes</div>
              <div className="md:col-span-3 flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
              <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest">States & Features</div>
              <div className="md:col-span-3 flex flex-wrap gap-3">
                <Button glow>Glow Effect</Button>
                <Button disabled>Disabled</Button>
                <Button variant="default">
                  With Icon <ArrowRight className="w-3 h-3" />
                </Button>
                <Button variant="outline">
                  <Zap className="w-3 h-3" /> Icon Left
                </Button>
                <Button href="/contact">As Link (href)</Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ——— 04 / Badges ——— */}
      <Section variant="grey">
        <Container size="full">
          <SectionHeader
            label="04 / Components"
            title="Badges"
            description="Status indicators and categorical labels."
          />

          <div className="flex flex-wrap gap-3 mt-12">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="inverted">Inverted</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="ghost">Ghost</Badge>
            <Badge variant="link">Link</Badge>
          </div>
        </Container>
      </Section>

      {/* ——— 05 / Cards ——— */}
      <Section>
        <Container size="full">
          <SectionHeader
            label="05 / Components"
            title="Cards"
            description="Containers for grouping related content. Styling is controlled via className."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <Card className="hover:border-foreground/30 hover:shadow-2xl hover:shadow-foreground/5 transition-all duration-500">
              <CardHeader>
                <CardTitle>Standard</CardTitle>
                <CardDescription>With hover effect</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-grey-600 dark:text-grey-400">Base card with hover border animation.</p>
              </CardContent>
            </Card>

            <Card className="border-foreground/20 p-6 sm:p-8">
              <CardHeader>
                <CardTitle>Premium</CardTitle>
                <CardDescription>Highlighted content</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-grey-600 dark:text-grey-400">Pronounced border for emphasis.</p>
              </CardContent>
            </Card>

            <Card className="bg-foreground text-background border-foreground">
              <CardHeader>
                <CardTitle>Dark</CardTitle>
                <CardDescription className="text-background/50">High contrast</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-background/70">Inverse color scheme.</p>
              </CardContent>
            </Card>

            <Card className="bg-transparent border-transparent">
              <CardHeader>
                <CardTitle>Ghost</CardTitle>
                <CardDescription>Minimal weight</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-grey-600 dark:text-grey-400">No background or border.</p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* ——— 06 / Inputs ——— */}
      <Section variant="grey">
        <Container size="full">
          <SectionHeader
            label="06 / Components"
            title="Inputs & Forms"
            description="Text entry, selection, and form controls."
          />

          <div className="space-y-12 mt-12">
            {/* Text Input */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
              <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest pt-2">Text Input</div>
              <div className="md:col-span-3 space-y-4 max-w-md">
                <Input placeholder="Email address" />
                <Input placeholder="Disabled" disabled />
                <Input type="password" placeholder="Password" />
                <div className="flex items-center gap-2">
                  <Input placeholder="Search..." className="flex-1" />
                  <Button size="sm" variant="outline"><Search className="w-3 h-3" /></Button>
                </div>
              </div>
            </div>

            <Separator />

            {/* Textarea */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
              <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest pt-2">Textarea</div>
              <div className="md:col-span-3 max-w-md">
                <Textarea placeholder="Write your message..." rows={4} />
              </div>
            </div>

            <Separator />

            {/* Select */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
              <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest pt-2">Select</div>
              <div className="md:col-span-3 max-w-md">
                <Select>
                  <SelectTrigger className="w-full"><SelectValue placeholder="Select a framework" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="svelte">SvelteKit</SelectItem>
                    <SelectItem value="astro">Astro</SelectItem>
                    <SelectItem value="remix">Remix</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            {/* Checkbox */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
              <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest pt-2">Checkbox</div>
              <div className="md:col-span-3 space-y-4">
                <div className="flex items-center gap-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-sm">Accept terms and conditions</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="newsletter" defaultChecked />
                  <Label htmlFor="newsletter" className="text-sm">Subscribe to newsletter</Label>
                </div>
              </div>
            </div>

            <Separator />

            {/* Radio Group */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
              <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest pt-2">Radio Group</div>
              <div className="md:col-span-3 space-y-3">
                <RadioGroup defaultValue="default">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="default" id="r1" />
                    <Label htmlFor="r1" className="text-sm">Default</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="comfortable" id="r2" />
                    <Label htmlFor="r2" className="text-sm">Comfortable</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="compact" id="r3" />
                    <Label htmlFor="r3" className="text-sm">Compact</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <Separator />

            {/* Switch */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
              <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest pt-2">Switch</div>
              <div className="md:col-span-3 space-y-4">
                <div className="flex items-center gap-2">
                  <Switch id="airplane" />
                  <Label htmlFor="airplane" className="text-sm">Airplane mode</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="notifications" defaultChecked />
                  <Label htmlFor="notifications" className="text-sm">Notifications</Label>
                </div>
              </div>
            </div>

            <Separator />

            {/* Slider */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
              <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest pt-2">Slider</div>
              <div className="md:col-span-3 max-w-md">
                <Slider defaultValue={[50]} max={100} step={1} />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ——— 07 / Overlays ——— */}
      <Section>
        <Container size="full">
          <SectionHeader
            label="07 / Components"
            title="Overlays"
            description="Dialogs, sheets, tooltips, and hover cards."
          />

          <div className="space-y-12 mt-12">
            {/* Dialog */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
              <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest pt-2">Dialog</div>
              <div className="md:col-span-3">
                <Dialog>
                  <DialogTrigger>
                    <Button variant="outline">Open Dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently delete your account.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-2">
                      <DialogClose>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <DialogClose>
                        <Button variant="default">Continue</Button>
                      </DialogClose>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <Separator />

            {/* Sheet */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
              <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest pt-2">Sheet</div>
              <div className="md:col-span-3 flex gap-3">
                <Sheet>
                  <SheetTrigger>
                    <Button variant="outline">Open Right</Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Side Panel</SheetTitle>
                      <SheetDescription>
                        Edit your profile details in this slide-out panel.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="py-6 text-sm text-grey-500">Content goes here.</div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            <Separator />

            {/* Tooltip */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
              <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest pt-2">Tooltip</div>
              <div className="md:col-span-3">
                <Tooltip>
                  <TooltipTrigger>
                    <Button variant="outline" size="sm">Hover me</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Helpful tooltip text</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            <Separator />

            {/* Hover Card */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
              <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest pt-2">Hover Card</div>
              <div className="md:col-span-3">
                <HoverCard>
                  <HoverCardTrigger>
                    <Button variant="link" className="px-0 text-foreground underline underline-offset-4">@FurmaTech</Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex justify-between gap-4">
                      <Avatar>
                        <AvatarFallback>F</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold">@FurmaTech</h4>
                        <p className="text-sm text-muted-foreground">
                          Bootstrapped venture studio building SaaS and AI tools.
                        </p>
                        <div className="flex items-center pt-2">
                          <span className="text-xs text-muted-foreground">Joined March 2026</span>
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ——— 08 / Dropdowns & Navigation ——— */}
      <Section variant="grey">
        <Container size="full">
          <SectionHeader
            label="08 / Components"
            title="Dropdowns & Menus"
            description="Context menus and navigation patterns."
          />

          <div className="space-y-12 mt-12">
            {/* Dropdown Menu */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
              <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest pt-2">Dropdown Menu</div>
              <div className="md:col-span-3">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="outline">
                      Options <ChevronDown className="ml-1 w-3 h-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" /> Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" /> Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Bell className="mr-2 h-4 w-4" /> Notifications
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ——— 09 / Data Display ——— */}
      <Section>
        <Container size="full">
          <SectionHeader
            label="09 / Components"
            title="Data Display"
            description="Tables, breadcrumbs, KBD, avatars, and loading states."
          />

          <div className="space-y-12 mt-12">
            {/* Breadcrumb */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
              <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest pt-2">Breadcrumb</div>
              <div className="md:col-span-3">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Aitlas</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </div>

            <Separator />

            {/* Table */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
              <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest pt-2">Table</div>
              <div className="md:col-span-3">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Nova</TableCell>
                      <TableCell><Badge variant="default">Active</Badge></TableCell>
                      <TableCell>AI Workspace</TableCell>
                      <TableCell className="text-right"><Button variant="ghost" size="sm"><ExternalLink className="w-3 h-3" /></Button></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Nexus</TableCell>
                      <TableCell><Badge variant="outline">Dev</Badge></TableCell>
                      <TableCell>Runtime</TableCell>
                      <TableCell className="text-right"><Button variant="ghost" size="sm"><ExternalLink className="w-3 h-3" /></Button></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">f.twyt</TableCell>
                      <TableCell><Badge variant="outline">Dev</Badge></TableCell>
                      <TableCell>Action</TableCell>
                      <TableCell className="text-right"><Button variant="ghost" size="sm"><ExternalLink className="w-3 h-3" /></Button></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>

            <Separator />

            {/* Avatar & KBD */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
              <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest pt-2">Avatar & KBD</div>
              <div className="md:col-span-3 flex flex-wrap gap-6 items-center">
                <div className="flex gap-3">
                  <Avatar><AvatarImage src="" /><AvatarFallback>AB</AvatarFallback></Avatar>
                  <Avatar><AvatarFallback>CD</AvatarFallback></Avatar>
                  <Avatar className="w-12 h-12"><AvatarFallback>XL</AvatarFallback></Avatar>
                </div>
                <div className="flex gap-2 items-center">
                  <Kbd>⌘</Kbd><Kbd>Shift</Kbd><Kbd>K</Kbd>
                </div>
                <div className="flex gap-2">
                  <Spinner className="h-3 w-3" />
                  <Spinner />
                  <Spinner className="h-6 w-6" />
                </div>
              </div>
            </div>

            <Separator />

            {/* Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
              <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest pt-2">Skeleton</div>
              <div className="md:col-span-3 space-y-3">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Progress */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
              <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest pt-2">Progress</div>
              <div className="md:col-span-3 max-w-md space-y-6">
                <Progress value={66} />
                <Progress value={33} />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ——— 10 / Alerts ——— */}
      <Section variant="grey">
        <Container size="full">
          <SectionHeader
            label="10 / Components"
            title="Alerts"
            description="Feedback messages for user actions."
          />

          <div className="space-y-6 mt-12 max-w-2xl">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>You can add components to your project using the CLI.</AlertDescription>
            </Alert>

            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
            </Alert>
          </div>
        </Container>
      </Section>

      {/* ——— 11 / Tabs & Accordion ——— */}
      <Section>
        <Container size="full">
          <SectionHeader
            label="11 / Components"
            title="Tabs & Accordion"
            description="Content organization patterns."
          />

          <div className="space-y-12 mt-12">
            {/* Tabs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
              <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest pt-2">Tabs</div>
              <div className="md:col-span-3">
                <Tabs defaultValue="account" className="max-w-md">
                  <TabsList>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                    <TabsTrigger value="billing">Billing</TabsTrigger>
                  </TabsList>
                  <TabsContent value="account" className="pt-4 text-sm text-grey-500">
                    Manage your account settings and profile information.
                  </TabsContent>
                  <TabsContent value="password" className="pt-4 text-sm text-grey-500">
                    Change your password and security preferences.
                  </TabsContent>
                  <TabsContent value="billing" className="pt-4 text-sm text-grey-500">
                    View invoices and update payment methods.
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            <Separator />

            {/* Accordion */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
              <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest pt-2">Accordion</div>
              <div className="md:col-span-3 max-w-xl">
                <Accordion>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What is Furma.tech?</AccordionTrigger>
                    <AccordionContent className="text-sm text-grey-500">
                      A bootstrapped venture studio building industry-specific SaaS tools and the Aitlas AI ecosystem.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>What is Aitlas?</AccordionTrigger>
                    <AccordionContent className="text-sm text-grey-500">
                      A sovereign AI platform with BYOK architecture, MCP-first design, and 34+ Actions for autonomous workflows.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>How do I get early access?</AccordionTrigger>
                    <AccordionContent className="text-sm text-grey-500">
                      Join the waitlist through the contact page. We review applications on a rolling basis.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ——— 12 / Toggle ——— */}
      <Section variant="grey">
        <Container size="full">
          <SectionHeader
            label="12 / Components"
            title="Toggle"
            description="Two-state interactive buttons for formatting and selection."
          />

          <div className="space-y-8 mt-12">
            <div className="flex gap-2">
              <Toggle aria-label="Toggle bold"><Bold className="h-4 w-4" /></Toggle>
              <Toggle aria-label="Toggle italic"><Italic className="h-4 w-4" /></Toggle>
              <Toggle aria-label="Toggle underline"><Underline className="h-4 w-4" /></Toggle>
            </div>

            <div className="flex gap-2 items-center">
              <Toggle size="sm" aria-label="Toggle minus"><Minus className="h-3 w-3" /></Toggle>
              <Toggle size="sm" aria-label="Toggle plus"><Plus className="h-3 w-3" /></Toggle>
            </div>
          </div>
        </Container>
      </Section>

      {/* ——— 13 / Utilities ——— */}
      <Section>
        <Container size="full">
          <SectionHeader
            label="13 / Utilities"
            title="CSS Effects"
            description="Custom CSS classes for premium interaction feel."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            <div className="space-y-4">
              <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest">Glassmorphism</div>
              <div className="h-40 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80')] bg-cover bg-center flex items-center justify-center p-8">
                <div className="glass p-6 text-center w-full">
                  <div className="font-bold">.glass</div>
                  <div className="text-[10px] uppercase tracking-widest mt-1 opacity-60">Blur + Translucency</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest">Interactions</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="hover-lift h-40 border border-border flex items-center justify-center font-bold bg-card cursor-pointer">
                  .hover-lift
                </div>
                <div className="card-hover h-40 border border-border flex items-center justify-center font-bold bg-card cursor-pointer">
                  .card-hover
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 space-y-4">
            <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest">Scroll Reveal</div>
            <StaggerChildren className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="p-12 border border-border text-center font-serif text-2xl italic opacity-30">
                  Item {i}
                </div>
              ))}
            </StaggerChildren>
            <p className="text-[11px] text-grey-500 uppercase tracking-widest text-center mt-4">
              Refresh the page to see the stagger animation.
            </p>
          </div>
        </Container>
      </Section>

      {/* ——— 14 / Layout ——— */}
      <Section variant="grey">
        <Container size="full">
          <SectionHeader
            label="14 / Layout"
            title="Section Variants"
            description="Controlled spacing and background combinations."
          />

          <div className="space-y-6 mt-12">
            <div className="p-8 border border-border bg-background flex items-center justify-between">
              <span className="font-bold">Default Section</span>
              <Badge variant="outline">bg-background</Badge>
            </div>
            <div className="p-8 border border-border bg-secondary flex items-center justify-between">
              <span className="font-bold">Grey Section</span>
              <Badge variant="outline">bg-secondary</Badge>
            </div>
            <div className="p-8 border border-foreground bg-foreground text-background flex items-center justify-between">
              <span className="font-bold">Dark Section</span>
              <Badge variant="outline" className="border-background text-background">bg-foreground</Badge>
            </div>
          </div>
        </Container>
      </Section>

      {/* ——— CTA ——— */}
      <Section variant="dark" className="mt-20">
        <Container size="md" className="text-center">
          <h2 className="font-serif text-5xl font-bold mb-8 italic">Ready to build?</h2>
          <div className="flex justify-center gap-4">
            <Button href="/" variant="outline" className="border-background text-background hover:bg-background hover:text-foreground">
              Return Home
            </Button>
            <Button href="/contact" variant="default">
              Contact Us
            </Button>
          </div>
        </Container>
      </Section>
    </div>
    </TooltipProvider>
  );
}
