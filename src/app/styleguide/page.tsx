"use client";

import { useState } from "react";
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
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from "@/components/ui/sheet";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose, DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger,
} from "@/components/ui/menubar";
import {
  ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp";
import {
  Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command";
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent, EmptyMedia } from "@/components/ui/empty";
import {
  Item, ItemContent, ItemDescription, ItemMedia, ItemSeparator, ItemTitle,
} from "@/components/ui/item";
import {
  Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup, InputGroupAddon, InputGroupInput, InputGroupText,
} from "@/components/ui/input-group";
import { NativeSelect } from "@/components/ui/native-select";
import { Toaster } from "@/components/ui/sonner";
import { Section, Container, SectionHeader } from "@/components/ui/Section";
import { ScrollReveal, StaggerChildren } from "@/components/ui/ScrollReveal";
import {
  ArrowRight, Zap, Settings, LogOut, User, Bold, Italic, Underline,
  Search, Bell, AlertCircle, Info, ChevronDown, ExternalLink, CreditCard,
  Calendar as CalendarIcon, Mail, Trash2, Star, Smile,
  FileText, Download, Share2, Eye, MessageSquare, Heart,
  Play, Pause, SkipBack, SkipForward, Mic, Phone, Video, MapPin, Globe,
  Lock, KeyRound, ShieldCheck, Fingerprint, ScanFace, Rocket,
} from "lucide-react";

// ——— Helper: section row layout ———
function SectionRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
      <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest pt-2">{label}</div>
      <div className="md:col-span-3">{children}</div>
    </div>
  );
}

export default function StyleguidePage() {
  // Local state for interactive demos
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [otp, setOtp] = useState("");
  const [sliderVal, setSliderVal] = useState([35]);
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);
  const [cmdkOpen, setCmdkOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date());
  const [toggleGroupVal, setToggleGroupVal] = useState<string[]>(["bold"]);

  return (
    <TooltipProvider>
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background pb-20">
      {/* ════ HEADER ════ */}
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
              Complete component library — 50+ shadcn primitives, customised for the Furma monochrome design system. All variants, sizes, and states documented.
            </p>
          </ScrollReveal>
        </Container>
      </Section>

      {/* ════ 01 / TYPOGRAPHY ════ */}
      <Section id="typography">
        <Container size="full">
          <SectionHeader label="01 / Foundation" title="Typography" description="Syne (UI), Cormorant (headlines), JetBrains Mono (data)." />
          <div className="space-y-16 mt-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
              <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest pt-2">Serif</div>
              <div className="md:col-span-3 space-y-6">
                <h1 className="font-serif text-6xl font-semibold tracking-tight">Headline H1</h1>
                <h2 className="font-serif text-5xl font-semibold tracking-tight">Headline H2</h2>
                <h3 className="font-serif text-4xl font-semibold tracking-tight">Headline H3</h3>
                <h4 className="font-serif text-3xl font-semibold tracking-tight italic">Headline H4 — Italic</h4>
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
              <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest pt-2">Sans</div>
              <div className="md:col-span-3 space-y-4">
                <div className="text-xl font-bold tracking-tight">Bold UI Text (20px)</div>
                <p className="text-grey-600 dark:text-grey-400 max-w-xl leading-relaxed">The quick brown fox jumps over the lazy dog. Primary UI font — clean, geometric, modern.</p>
                <div className="text-sm font-medium uppercase tracking-widest">Small Caps Label (14px)</div>
                <p className="text-sm text-grey-500 leading-relaxed max-w-xl">Secondary text and descriptive labels use a smaller scale with increased tracking.</p>
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
              <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest pt-2">Mono</div>
              <div className="md:col-span-3 space-y-4">
                <div className="font-mono text-sm bg-grey-50 dark:bg-grey-900 p-4 border border-border">
                  {`const system = "Furma.tech";`}<br />
                  {`console.log(\`Welcome to \${system}\`);`}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ════ 02 / COLORS ════ */}
      <Section variant="grey">
        <Container size="full">
          <SectionHeader label="02 / Foundation" title="Color Palette" description="Strictly monochrome. oklch color space for perceptual balance." />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-12">
            {[
              { name: "Background", cls: "bg-background", text: "text-foreground", border: "border-border" },
              { name: "Foreground", cls: "bg-foreground", text: "text-background", border: "border-foreground" },
              { name: "Card", cls: "bg-card", text: "text-card-foreground", border: "border-border" },
              { name: "Secondary", cls: "bg-secondary", text: "text-foreground", border: "border-border" },
              { name: "Muted", cls: "bg-muted", text: "text-muted-foreground", border: "border-border" },
              { name: "Accent", cls: "bg-accent", text: "text-accent-foreground", border: "border-border" },
            ].map(c => (
              <div key={c.name} className="space-y-3">
                <div className={`h-20 w-full border ${c.cls} flex items-center justify-center font-bold text-[10px] uppercase tracking-widest ${c.text}`}>{c.name}</div>
                <div className="font-mono text-[9px] text-grey-500 uppercase tracking-widest">{c.name}</div>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest mb-4">Grey Scale</div>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(s => (
                <div key={s} className="space-y-2">
                  <div className={`h-12 w-full bg-grey-${s} border border-border/50`}></div>
                  <div className="font-mono text-[8px] text-grey-400 text-center">{s}</div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ════ 03 / BUTTONS ════ */}
      <Section>
        <Container size="full">
          <SectionHeader label="03 / Components" title="Buttons" description="Primary interaction points with tracked variants and sizes." />
          <div className="space-y-12 mt-12">
            <SectionRow label="Variants">
              <div className="flex flex-wrap gap-3">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="premium">Premium</Button>
                <Button variant="dark">Dark</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
              </div>
            </SectionRow>
            <SectionRow label="Sizes">
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </SectionRow>
            <SectionRow label="Icon & States">
              <div className="flex flex-wrap gap-3">
                <Button glow>Glow Effect</Button>
                <Button disabled>Disabled</Button>
                <Button variant="default">With Icon <ArrowRight className="w-3 h-3" /></Button>
                <Button variant="outline"><Zap className="w-3 h-3" /> Icon Left</Button>
                <Button href="/#contact">As Link (href)</Button>
              </div>
            </SectionRow>
          </div>
        </Container>
      </Section>

      {/* ════ 04 / BADGES ════ */}
      <Section variant="grey">
        <Container size="full">
          <SectionHeader label="04 / Components" title="Badges" description="Status indicators and categorical labels." />
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

      {/* ════ 05 / CARDS ════ */}
      <Section>
        <Container size="full">
          <SectionHeader label="05 / Components" title="Cards" description="Containers for grouping related content. Styling via className." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <Card className="hover:border-foreground/30 hover:shadow-2xl hover:shadow-foreground/5 transition-all duration-500">
              <CardHeader><CardTitle>Standard</CardTitle><CardDescription>With hover effect</CardDescription></CardHeader>
              <CardContent><p className="text-sm text-grey-600 dark:text-grey-400">Base card with hover border animation.</p></CardContent>
            </Card>
            <Card className="border-foreground/20 p-6 sm:p-8">
              <CardHeader><CardTitle>Premium</CardTitle><CardDescription>Highlighted content</CardDescription></CardHeader>
              <CardContent><p className="text-sm text-grey-600 dark:text-grey-400">Pronounced border for emphasis.</p></CardContent>
            </Card>
            <Card className="bg-foreground text-background border-foreground">
              <CardHeader><CardTitle>Dark</CardTitle><CardDescription className="text-background/50">High contrast</CardDescription></CardHeader>
              <CardContent><p className="text-sm text-background/70">Inverse color scheme.</p></CardContent>
            </Card>
            <Card className="bg-transparent border-transparent">
              <CardHeader><CardTitle>Ghost</CardTitle><CardDescription>Minimal weight</CardDescription></CardHeader>
              <CardContent><p className="text-sm text-grey-600 dark:text-grey-400">No background or border.</p></CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* ════ 06 / INPUTS & FORMS ════ */}
      <Section variant="grey">
        <Container size="full">
          <SectionHeader label="06 / Components" title="Inputs & Forms" description="Text entry, selection, and form controls." />
          <div className="space-y-12 mt-12">
            <SectionRow label="Input">
              <div className="space-y-4 max-w-md">
                <Input placeholder="Email address" />
                <Input placeholder="Disabled" disabled />
                <Input type="password" placeholder="Password" />
                <div className="flex items-center gap-2">
                  <Input placeholder="Search..." className="flex-1" />
                  <Button size="sm" variant="outline"><Search className="w-3 h-3" /></Button>
                </div>
              </div>
            </SectionRow>
            <Separator />
            <SectionRow label="Textarea">
              <Textarea placeholder="Write your message..." rows={4} className="max-w-md" />
            </SectionRow>
            <Separator />
            <SectionRow label="Select">
              <Select>
                <SelectTrigger className="w-full max-w-xs"><SelectValue placeholder="Select a framework" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="svelte">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="remix">Remix</SelectItem>
                </SelectContent>
              </Select>
            </SectionRow>
            <Separator />
            <SectionRow label="Native Select">
              <NativeSelect className="max-w-xs">
                <option value="">Choose...</option>
                <option value="a">Option A</option>
                <option value="b">Option B</option>
                <option value="c">Option C</option>
              </NativeSelect>
            </SectionRow>
            <Separator />
            <SectionRow label="Checkbox">
              <div className="space-y-3">
                <div className="flex items-center gap-2"><Checkbox id="terms" /><Label htmlFor="terms" className="text-sm">Accept terms</Label></div>
                <div className="flex items-center gap-2"><Checkbox id="nl" defaultChecked /><Label htmlFor="nl" className="text-sm">Subscribe to newsletter</Label></div>
              </div>
            </SectionRow>
            <Separator />
            <SectionRow label="Radio Group">
              <RadioGroup defaultValue="default">
                <div className="flex items-center gap-2"><RadioGroupItem value="default" id="r1" /><Label htmlFor="r1" className="text-sm">Default</Label></div>
                <div className="flex items-center gap-2"><RadioGroupItem value="comfortable" id="r2" /><Label htmlFor="r2" className="text-sm">Comfortable</Label></div>
                <div className="flex items-center gap-2"><RadioGroupItem value="compact" id="r3" /><Label htmlFor="r3" className="text-sm">Compact</Label></div>
              </RadioGroup>
            </SectionRow>
            <Separator />
            <SectionRow label="Switch">
              <div className="space-y-3">
                <div className="flex items-center gap-2"><Switch id="ap" /><Label htmlFor="ap" className="text-sm">Airplane mode</Label></div>
                <div className="flex items-center gap-2"><Switch id="nt" defaultChecked /><Label htmlFor="nt" className="text-sm">Notifications</Label></div>
              </div>
            </SectionRow>
            <Separator />
            <SectionRow label="Slider">
              <Slider value={sliderVal} onValueChange={(v) => setSliderVal(Array.isArray(v) ? v : [v])} max={100} step={1} className="max-w-xs" />
            </SectionRow>
            <Separator />
            <SectionRow label="Input OTP">
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} /><InputOTPSlot index={1} /><InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} /><InputOTPSlot index={4} /><InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </SectionRow>
            <Separator />
            <SectionRow label="Input Group">
              <div className="max-w-md space-y-4">
                <InputGroup>
                  <InputGroupAddon><Globe className="h-4 w-4 text-grey-400" /></InputGroupAddon>
                  <InputGroupInput placeholder="example.com" />
                </InputGroup>
                <InputGroup>
                  <InputGroupInput placeholder="Amount" />
                  <InputGroupAddon><InputGroupText>USD</InputGroupText></InputGroupAddon>
                </InputGroup>
              </div>
            </SectionRow>
            <Separator />
            <SectionRow label="Field">
              <FieldGroup className="max-w-md space-y-4">
                <Field>
                  <FieldLabel htmlFor="field-email">Email</FieldLabel>
                  <FieldContent><Input id="field-email" placeholder="you@example.com" /></FieldContent>
                  <FieldDescription>We&apos;ll never share your email.</FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="field-pw">Password</FieldLabel>
                  <FieldContent><Input id="field-pw" type="password" /></FieldContent>
                  <FieldError errors={[{ message: "Password must be at least 8 characters" }]} />
                </Field>
              </FieldGroup>
            </SectionRow>
          </div>
        </Container>
      </Section>

      {/* ════ 07 / TOGGLE & TOGGLE GROUP ════ */}
      <Section>
        <Container size="full">
          <SectionHeader label="07 / Components" title="Toggle" description="Two-state and multi-state selection buttons." />
          <div className="space-y-12 mt-12">
            <SectionRow label="Toggle">
              <div className="flex gap-2">
                <Toggle aria-label="Toggle bold"><Bold className="h-4 w-4" /></Toggle>
                <Toggle aria-label="Toggle italic"><Italic className="h-4 w-4" /></Toggle>
                <Toggle aria-label="Toggle underline"><Underline className="h-4 w-4" /></Toggle>
              </div>
            </SectionRow>
            <Separator />
            <SectionRow label="Toggle Group">
              <ToggleGroup value={toggleGroupVal} onValueChange={setToggleGroupVal}>
                <ToggleGroupItem value="bold" aria-label="Toggle bold"><Bold className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Toggle italic"><Italic className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough"><Underline className="h-4 w-4" /></ToggleGroupItem>
              </ToggleGroup>
            </SectionRow>
          </div>
        </Container>
      </Section>

      {/* ════ 08 / OVERLAYS ════ */}
      <Section variant="grey">
        <Container size="full">
          <SectionHeader label="08 / Components" title="Overlays" description="Dialogs, sheets, drawers, tooltips, and hover cards." />
          <div className="space-y-12 mt-12">
            <SectionRow label="Dialog">
              <Dialog>
                <DialogTrigger><Button variant="outline">Open Dialog</Button></DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Edit profile</DialogTitle><DialogDescription>Make changes to your profile here.</DialogDescription></DialogHeader>
                  <div className="py-4"><Input placeholder="Name" /></div>
                  <DialogFooter className="flex justify-end gap-2">
                    <DialogClose><Button variant="outline">Cancel</Button></DialogClose>
                    <DialogClose><Button variant="default">Save</Button></DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </SectionRow>
            <Separator />
            <SectionRow label="Alert Dialog">
              <AlertDialog>
                <AlertDialogTrigger><Button variant="destructive">Delete Account</Button></AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader><AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle><AlertDialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</AlertDialogDescription></AlertDialogHeader>
                  <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction>Continue</AlertDialogAction></AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </SectionRow>
            <Separator />
            <SectionRow label="Sheet">
              <Sheet>
                <SheetTrigger><Button variant="outline">Open Sheet</Button></SheetTrigger>
                <SheetContent>
                  <SheetHeader><SheetTitle>Side Panel</SheetTitle><SheetDescription>Edit your profile details.</SheetDescription></SheetHeader>
                  <div className="py-6 text-sm text-grey-500">Content goes here.</div>
                </SheetContent>
              </Sheet>
            </SectionRow>
            <Separator />
            <SectionRow label="Drawer">
              <Drawer>
                <DrawerTrigger><Button variant="outline">Open Drawer</Button></DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader><DrawerTitle>Bottom Drawer</DrawerTitle><DrawerDescription>Slide up panel for mobile interactions.</DrawerDescription></DrawerHeader>
                  <div className="p-4 text-sm text-grey-500">Drawer content here.</div>
                  <DrawerFooter><DrawerClose><Button variant="outline">Close</Button></DrawerClose></DrawerFooter>
                </DrawerContent>
              </Drawer>
            </SectionRow>
            <Separator />
            <SectionRow label="Tooltip">
              <Tooltip>
                <TooltipTrigger><Button variant="outline" size="sm">Hover me</Button></TooltipTrigger>
                <TooltipContent><p>Helpful tooltip text</p></TooltipContent>
              </Tooltip>
            </SectionRow>
            <Separator />
            <SectionRow label="Hover Card">
              <HoverCard>
                <HoverCardTrigger><Button variant="link" className="px-0 text-foreground underline underline-offset-4">@FurmaTech</Button></HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex justify-between gap-4">
                    <Avatar><AvatarFallback>F</AvatarFallback></Avatar>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold">@FurmaTech</h4>
                      <p className="text-sm text-muted-foreground">Bootstrapped venture studio building SaaS and AI tools.</p>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </SectionRow>
            <Separator />
            <SectionRow label="Popover">
              <Popover>
                <PopoverTrigger><Button variant="outline">Open Popover</Button></PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2"><h4 className="font-bold text-sm">Dimensions</h4><p className="text-xs text-muted-foreground">Set the dimensions for the layer.</p></div>
                    <div className="grid gap-2"><Label className="text-xs">Width</Label><Input id="width" defaultValue="100%" className="h-8" /></div>
                  </div>
                </PopoverContent>
              </Popover>
            </SectionRow>
          </div>
        </Container>
      </Section>

      {/* ════ 09 / DROPDOWN & MENUS ════ */}
      <Section>
        <Container size="full">
          <SectionHeader label="09 / Components" title="Dropdowns & Menus" description="Context menus, dropdowns, and menubars." />
          <div className="space-y-12 mt-12">
            <SectionRow label="Dropdown Menu">
              <DropdownMenu>
                <DropdownMenuTrigger><Button variant="outline">Options <ChevronDown className="ml-1 w-3 h-3" /></Button></DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem><User className="mr-2 h-4 w-4" /> Profile</DropdownMenuItem>
                  <DropdownMenuItem><Settings className="mr-2 h-4 w-4" /> Settings</DropdownMenuItem>
                  <DropdownMenuItem><Bell className="mr-2 h-4 w-4" /> Notifications</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem><LogOut className="mr-2 h-4 w-4" /> Log out <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SectionRow>
            <Separator />
            <SectionRow label="Menubar">
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>File</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem><FileText className="mr-2 h-4 w-4" /> New Tab <MenubarShortcut>⌘T</MenubarShortcut></MenubarItem>
                    <MenubarItem><Download className="mr-2 h-4 w-4" /> Download <MenubarShortcut>⌘D</MenubarShortcut></MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Print <MenubarShortcut>⌘P</MenubarShortcut></MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger>Edit</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>Undo <MenubarShortcut>⌘Z</MenubarShortcut></MenubarItem>
                    <MenubarItem>Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut></MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Cut</MenubarItem>
                    <MenubarItem>Copy</MenubarItem>
                    <MenubarItem>Paste</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger>View</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>Reload <MenubarShortcut>⌘R</MenubarShortcut></MenubarItem>
                    <MenubarItem>Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut></MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Toggle Fullscreen</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </SectionRow>
            <Separator />
            <SectionRow label="Context Menu">
              <ContextMenu>
                <ContextMenuTrigger>
                  <div className="flex h-36 w-full max-w-sm items-center justify-center rounded border border-dashed border-border text-xs text-grey-400 select-none">Right-click here</div>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem><ExternalLink className="mr-2 h-4 w-4" /> Open in new tab</ContextMenuItem>
                  <ContextMenuItem><Share2 className="mr-2 h-4 w-4" /> Share</ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem variant="destructive"><Trash2 className="mr-2 h-4 w-4" /> Delete <ContextMenuShortcut>⌘⌫</ContextMenuShortcut></ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            </SectionRow>
            <Separator />
            <SectionRow label="Command Palette">
              <div className="flex gap-3 items-center">
                <Button variant="outline" onClick={() => setCmdkOpen(true)}>
                  <Search className="mr-2 h-4 w-4" /> Search... <Kbd className="ml-4">⌘K</Kbd>
                </Button>
                <CommandDialog open={cmdkOpen} onOpenChange={setCmdkOpen}>
                  <CommandInput placeholder="Type a command or search..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                      <CommandItem><CalendarIcon className="mr-2 h-4 w-4" /><span>Calendar</span></CommandItem>
                      <CommandItem><Smile className="mr-2 h-4 w-4" /><span>Search Emoji</span></CommandItem>
                      <CommandItem><Rocket className="mr-2 h-4 w-4" /><span>Launch</span></CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Settings">
                      <CommandItem><User className="mr-2 h-4 w-4" /><span>Profile</span><CommandShortcut>⌘P</CommandShortcut></CommandItem>
                      <CommandItem><CreditCard className="mr-2 h-4 w-4" /><span>Billing</span><CommandShortcut>⌘B</CommandShortcut></CommandItem>
                      <CommandItem><Settings className="mr-2 h-4 w-4" /><span>Settings</span><CommandShortcut>⌘S</CommandShortcut></CommandItem>
                    </CommandGroup>
                  </CommandList>
                </CommandDialog>
              </div>
            </SectionRow>
          </div>
        </Container>
      </Section>

      {/* ════ 10 / DATA DISPLAY ════ */}
      <Section variant="grey">
        <Container size="full">
          <SectionHeader label="10 / Components" title="Data Display" description="Tables, breadcrumbs, avatars, KBD, spinners, and loading states." />
          <div className="space-y-12 mt-12">
            <SectionRow label="Breadcrumb">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
                  <BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbLink href="/projects">Projects</BreadcrumbLink></BreadcrumbItem>
                  <BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>Aitlas</BreadcrumbPage></BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </SectionRow>
            <Separator />
            <SectionRow label="Table">
              <Table>
                <TableHeader>
                  <TableRow><TableHead>Name</TableHead><TableHead>Status</TableHead><TableHead>Role</TableHead><TableHead className="text-right">Action</TableHead></TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow><TableCell className="font-medium">Nova</TableCell><TableCell><Badge variant="default">Active</Badge></TableCell><TableCell>AI Workspace</TableCell><TableCell className="text-right"><Button variant="ghost" size="sm"><ExternalLink className="w-3 h-3" /></Button></TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">Nexus</TableCell><TableCell><Badge variant="outline">Dev</Badge></TableCell><TableCell>Runtime</TableCell><TableCell className="text-right"><Button variant="ghost" size="sm"><ExternalLink className="w-3 h-3" /></Button></TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">Agents</TableCell><TableCell><Badge variant="outline">Dev</Badge></TableCell><TableCell>Marketplace</TableCell><TableCell className="text-right"><Button variant="ghost" size="sm"><ExternalLink className="w-3 h-3" /></Button></TableCell></TableRow>
                </TableBody>
              </Table>
            </SectionRow>
            <Separator />
            <SectionRow label="Avatar & KBD">
              <div className="flex flex-wrap gap-6 items-center">
                <div className="flex gap-3">
                  <Avatar><AvatarImage src="" /><AvatarFallback>AB</AvatarFallback></Avatar>
                  <Avatar><AvatarFallback>CD</AvatarFallback></Avatar>
                  <Avatar className="w-12 h-12"><AvatarFallback>XL</AvatarFallback></Avatar>
                </div>
                <div className="flex gap-2 items-center">
                  <Kbd>⌘</Kbd><Kbd>Shift</Kbd><Kbd>K</Kbd>
                </div>
              </div>
            </SectionRow>
            <Separator />
            <SectionRow label="Spinner & Progress">
              <div className="flex flex-wrap gap-6 items-center max-w-md">
                <div className="flex gap-3 items-center"><Spinner className="h-3 w-3" /><Spinner /><Spinner className="h-6 w-6" /></div>
                <Progress value={66} className="w-full max-w-xs" />
                <Progress value={33} className="w-full max-w-xs" />
              </div>
            </SectionRow>
            <Separator />
            <SectionRow label="Skeleton">
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1 max-w-xs">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            </SectionRow>
            <Separator />
            <SectionRow label="Pagination">
              <Pagination>
                <PaginationContent>
                  <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                  <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationEllipsis /></PaginationItem>
                  <PaginationItem><PaginationNext href="#" /></PaginationItem>
                </PaginationContent>
              </Pagination>
            </SectionRow>
            <Separator />
            <SectionRow label="Item">
              <div className="max-w-md space-y-1">
                <Item><ItemMedia><Avatar><AvatarFallback>N</AvatarFallback></Avatar></ItemMedia><ItemContent><ItemTitle>Nova</ItemTitle><ItemDescription>AI workspace with BYOK</ItemDescription></ItemContent></Item>
                <ItemSeparator />
                <Item><ItemMedia><Avatar><AvatarFallback>X</AvatarFallback></Avatar></ItemMedia><ItemContent><ItemTitle>Nexus</ItemTitle><ItemDescription>Durable agent runtime</ItemDescription></ItemContent></Item>
                <ItemSeparator />
                <Item variant="muted"><ItemMedia><Avatar><AvatarFallback>A</AvatarFallback></Avatar></ItemMedia><ItemContent><ItemTitle>Agents</ItemTitle><ItemDescription>AI agent marketplace</ItemDescription></ItemContent></Item>
              </div>
            </SectionRow>
            <Separator />
            <SectionRow label="Empty">
              <Empty className="max-w-md border border-border">
                <EmptyHeader>
                  <EmptyMedia variant="icon"><Mail className="h-8 w-8 text-grey-400" /></EmptyMedia>
                  <EmptyTitle>No messages</EmptyTitle>
                  <EmptyDescription>There are no messages in your inbox yet.</EmptyDescription>
                </EmptyHeader>
                <EmptyContent><Button variant="outline" size="sm">Mark as read</Button></EmptyContent>
              </Empty>
            </SectionRow>
            <Separator />
            <SectionRow label="Aspect Ratio">
              <div className="max-w-sm">
                <AspectRatio ratio={16 / 9} className="bg-grey-100 dark:bg-grey-900 flex items-center justify-center">
                  <span className="text-xs text-grey-500 font-mono">16:9</span>
                </AspectRatio>
              </div>
            </SectionRow>
            <Separator />
            <SectionRow label="Scroll Area">
              <ScrollArea className="h-40 w-full max-w-sm border border-border">
                <div className="p-4 space-y-4">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="text-sm text-grey-500">Item {i + 1} — Lorem ipsum dolor sit amet.</div>
                  ))}
                </div>
                <ScrollBar orientation="vertical" />
              </ScrollArea>
            </SectionRow>
          </div>
        </Container>
      </Section>

      {/* ════ 11 / CALENDAR ════ */}
      <Section>
        <Container size="full">
          <SectionHeader label="11 / Components" title="Calendar" description="Date picker component." />
          <div className="mt-12 flex gap-12 flex-wrap">
            <Calendar mode="single" selected={date} onSelect={setDate} className="border border-border" month={calendarMonth} onMonthChange={setCalendarMonth} />
            <div className="space-y-2">
              <p className="text-sm font-bold">Selected:</p>
              <p className="text-sm text-grey-500">{date ? date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) : "No date selected"}</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ════ 12 / COLLAPSIBLE & ACCORDION ════ */}
      <Section variant="grey">
        <Container size="full">
          <SectionHeader label="12 / Components" title="Collapsible & Accordion" description="Expandable content sections." />
          <div className="space-y-12 mt-12">
            <SectionRow label="Collapsible">
              <Collapsible open={collapsibleOpen} onOpenChange={setCollapsibleOpen} className="w-full max-w-sm space-y-2">
                <div className="flex items-center justify-between space-x-4">
                  <h4 className="text-sm font-bold">What is Furma.tech?</h4>
                  <CollapsibleTrigger><Button variant="ghost" size="sm"><ChevronDown className={`h-4 w-4 transition-transform ${collapsibleOpen ? "rotate-180" : ""}`} /></Button></CollapsibleTrigger>
                </div>
                <div className="border border-border px-4 py-3 text-sm text-grey-500">
                  A bootstrapped venture studio building industry-specific SaaS tools and the Aitlas AI ecosystem.
                </div>
              </Collapsible>
            </SectionRow>
            <Separator />
            <SectionRow label="Accordion">
              <Accordion className="max-w-xl">
                <AccordionItem value="a"><AccordionTrigger>What is Furma.tech?</AccordionTrigger><AccordionContent className="text-sm text-grey-500">A bootstrapped venture studio building SaaS and AI tools.</AccordionContent></AccordionItem>
                <AccordionItem value="b"><AccordionTrigger>What is Aitlas?</AccordionTrigger><AccordionContent className="text-sm text-grey-500">A sovereign AI platform with BYOK architecture and MCP-first design.</AccordionContent></AccordionItem>
                <AccordionItem value="c"><AccordionTrigger>How do I get access?</AccordionTrigger><AccordionContent className="text-sm text-grey-500">Join the waitlist through the contact page.</AccordionContent></AccordionItem>
              </Accordion>
            </SectionRow>
          </div>
        </Container>
      </Section>

      {/* ════ 13 / TABS ════ */}
      <Section>
        <Container size="full">
          <SectionHeader label="13 / Components" title="Tabs" description="Content organization with tab navigation." />
          <div className="mt-12">
            <Tabs defaultValue="account" className="max-w-md">
              <TabsList><TabsTrigger value="account">Account</TabsTrigger><TabsTrigger value="password">Password</TabsTrigger><TabsTrigger value="billing">Billing</TabsTrigger></TabsList>
              <TabsContent value="account" className="pt-4 text-sm text-grey-500">Manage your account settings and profile information.</TabsContent>
              <TabsContent value="password" className="pt-4 text-sm text-grey-500">Change your password and security preferences.</TabsContent>
              <TabsContent value="billing" className="pt-4 text-sm text-grey-500">View invoices and update payment methods.</TabsContent>
            </Tabs>
          </div>
        </Container>
      </Section>

      {/* ════ 14 / ALERTS & SONNER ════ */}
      <Section variant="grey">
        <Container size="full">
          <SectionHeader label="14 / Components" title="Alerts & Toasts" description="Feedback messages for user actions." />
          <div className="space-y-6 mt-12 max-w-2xl">
            <Alert><Info className="h-4 w-4" /><AlertTitle>Heads up!</AlertTitle><AlertDescription>You can add components to your project using the CLI.</AlertDescription></Alert>
            <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>Your session has expired. Please log in again.</AlertDescription></Alert>
            <Toaster />
            <div className="flex flex-wrap gap-3 pt-4">
              <Button variant="outline" onClick={() => { import("sonner").then(({ toast }) => toast("Event has been created.", { description: "Sunday, December 03, 2026 at 9:00 AM", action: { label: "Undo", onClick: () => {} } })); }}>Show Toast</Button>
              <Button variant="outline" onClick={() => { import("sonner").then(({ toast }) => toast.success("Success!", { description: "Your changes have been saved." })); }}>Success Toast</Button>
              <Button variant="outline" onClick={() => { import("sonner").then(({ toast }) => toast.error("Error!", { description: "Something went wrong." })); }}>Error Toast</Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ════ 15 / MEDIA CONTROLS ════ */}
      <Section>
        <Container size="full">
          <SectionHeader label="15 / Components" title="Media Controls" description="Audio, video, and communication control patterns." />
          <div className="space-y-12 mt-12">
            <SectionRow label="Media Transport">
              <div className="flex gap-2 items-center">
                <Toggle aria-label="Skip back"><SkipBack className="h-4 w-4" /></Toggle>
                <Toggle aria-label="Play"><Play className="h-4 w-4" /></Toggle>
                <Toggle aria-label="Pause"><Pause className="h-4 w-4" /></Toggle>
                <Toggle aria-label="Skip forward"><SkipForward className="h-4 w-4" /></Toggle>
                <Toggle aria-label="Microphone"><Mic className="h-4 w-4" /></Toggle>
              </div>
            </SectionRow>
            <Separator />
            <SectionRow label="Communication">
              <div className="flex gap-2">
                <Button variant="outline" size="sm"><Phone className="mr-2 h-4 w-4" /> Call</Button>
                <Button variant="outline" size="sm"><Video className="mr-2 h-4 w-4" /> Video</Button>
                <Button variant="outline" size="sm"><MessageSquare className="mr-2 h-4 w-4" /> Chat</Button>
              </div>
            </SectionRow>
            <Separator />
            <SectionRow label="Location & Web">
              <div className="flex gap-2">
                <Button variant="ghost" size="sm"><MapPin className="mr-2 h-4 w-4" /> Location</Button>
                <Button variant="ghost" size="sm"><Globe className="mr-2 h-4 w-4" /> Website</Button>
                <Button variant="ghost" size="sm"><Heart className="mr-2 h-4 w-4" /> Like</Button>
                <Button variant="ghost" size="sm"><Star className="mr-2 h-4 w-4" /> Star</Button>
                <Button variant="ghost" size="sm"><Eye className="mr-2 h-4 w-4" /> View</Button>
              </div>
            </SectionRow>
          </div>
        </Container>
      </Section>

      {/* ════ 16 / SECURITY ════ */}
      <Section variant="grey">
        <Container size="full">
          <SectionHeader label="16 / Components" title="Security" description="Authentication and security-related UI patterns." />
          <div className="space-y-12 mt-12">
            <SectionRow label="Icons">
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm"><Lock className="mr-2 h-4 w-4" /> Locked</Button>
                <Button variant="outline" size="sm"><KeyRound className="mr-2 h-4 w-4" /> API Key</Button>
                <Button variant="outline" size="sm"><ShieldCheck className="mr-2 h-4 w-4" /> Verified</Button>
                <Button variant="outline" size="sm"><Fingerprint className="mr-2 h-4 w-4" /> Biometric</Button>
                <Button variant="outline" size="sm"><ScanFace className="mr-2 h-4 w-4" /> Face ID</Button>
              </div>
            </SectionRow>
          </div>
        </Container>
      </Section>

      {/* ════ 17 / CAROUSEL ════ */}
      <Section>
        <Container size="full">
          <SectionHeader label="17 / Components" title="Carousel" description="Horizontal/vertical sliding content." />
          <div className="mt-12 max-w-2xl">
            <Carousel className="w-full max-w-xs mx-auto">
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, i) => (
                  <CarouselItem key={i}>
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <span className="text-4xl font-bold text-grey-400">{i + 1}</span>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </Container>
      </Section>

      {/* ════ 18 / LAYOUT ════ */}
      <Section variant="grey">
        <Container size="full">
          <SectionHeader label="18 / Layout" title="Section Variants" description="Controlled spacing and background combinations." />
          <div className="space-y-6 mt-12">
            <div className="p-8 border border-border bg-background flex items-center justify-between"><span className="font-bold">Default Section</span><Badge variant="outline">bg-background</Badge></div>
            <div className="p-8 border border-border bg-secondary flex items-center justify-between"><span className="font-bold">Grey Section</span><Badge variant="outline">bg-secondary</Badge></div>
            <div className="p-8 border border-foreground bg-foreground text-background flex items-center justify-between"><span className="font-bold">Dark Section</span><Badge variant="outline" className="border-background text-background">bg-foreground</Badge></div>
          </div>
        </Container>
      </Section>

      {/* ════ 19 / CSS EFFECTS ════ */}
      <Section>
        <Container size="full">
          <SectionHeader label="19 / Utilities" title="CSS Effects" description="Custom CSS classes for premium interaction feel." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            <div className="space-y-4">
              <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest">Glassmorphism</div>
              <div className="h-40 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80')] bg-cover bg-center flex items-center justify-center p-8">
                <div className="glass p-6 text-center w-full"><div className="font-bold">.glass</div><div className="text-[10px] uppercase tracking-widest mt-1 opacity-60">Blur + Translucency</div></div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest">Interactions</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="hover-lift h-40 border border-border flex items-center justify-center font-bold bg-card cursor-pointer">.hover-lift</div>
                <div className="card-hover h-40 border border-border flex items-center justify-center font-bold bg-card cursor-pointer">.card-hover</div>
              </div>
            </div>
          </div>
          <div className="mt-16 space-y-4">
            <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest">Scroll Reveal</div>
            <StaggerChildren className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (<div key={i} className="p-12 border border-border text-center font-serif text-2xl italic opacity-30">Item {i}</div>))}
            </StaggerChildren>
            <p className="text-[11px] text-grey-500 uppercase tracking-widest text-center mt-4">Refresh the page to see the stagger animation.</p>
          </div>
        </Container>
      </Section>

      {/* ════ 20 / COMPONENT REFERENCE ════ */}
      <Section>
        <Container size="full">
          <SectionHeader label="20 / Reference" title="All Components" description="Complete component inventory with variants and use cases." />
          <div className="space-y-8 mt-12">
            {/* Component Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "Button", variants: ["default", "secondary", "outline", "ghost", "premium", "dark", "destructive", "link"], sizes: ["sm", "default", "md", "lg"], icons: true },
                { name: "Badge", variants: ["default", "secondary", "outline", "inverted", "destructive", "ghost", "link"] },
                { name: "Alert", variants: ["default", "destructive"] },
                { name: "Card", variants: ["default", "highlighted", "dark", "ghost"] },
                { name: "Input", types: ["text", "password", "email", "number", "disabled"] },
                { name: "Textarea", states: ["default", "disabled", "focused"] },
                { name: "Select", states: ["default", "disabled", "with groups"] },
                { name: "Checkbox", states: ["unchecked", "checked", "disabled"] },
                { name: "Radio", states: ["unchecked", "checked", "disabled"] },
                { name: "Switch", states: ["off", "on", "disabled"] },
                { name: "Slider", variants: ["single", "range", "disabled"] },
                { name: "Toggle", states: ["inactive", "active", "disabled"] },
                { name: "Label", states: ["default", "required", "disabled"] },
                { name: "Progress", variants: ["default", "animated"] },
                { name: "Separator", orientation: ["horizontal", "vertical"] },
                { name: "Avatar", sizes: ["sm", "default", "lg"], states: ["with image", "fallback"] },
                { name: "Kbd", variants: ["single key", "key combo"] },
                { name: "Spinner", sizes: ["sm", "default", "lg"] },
                { name: "Skeleton", shapes: ["rect", "circle"] },
                { name: "Breadcrumb", states: ["with separators", "with links"] },
                { name: "Pagination", states: ["first page", "middle", "last page", "disabled"] },
                { name: "Table", variants: ["striped", "hover", "compact", "condensed"] },
                { name: "Tabs", orientation: ["horizontal", "vertical"], align: ["left", "center", "right"] },
                { name: "Accordion", states: ["expanded", "collapsed", "all expanded"] },
                { name: "Tooltip", position: ["top", "right", "bottom", "left"] },
                { name: "Dialog", sizes: ["default", "lg", "full"] },
                { name: "Alert Dialog", use: ["confirmation", "destructive action"] },
                { name: "Sheet", direction: ["left", "right", "top", "bottom"] },
                { name: "Drawer", position: ["bottom"] },
                { name: "Popover", position: ["top", "right", "bottom", "left"] },
                { name: "Hover Card", trigger: ["hover"] },
                { name: "Dropdown Menu", variants: ["icon menu", "action menu"] },
                { name: "Context Menu", use: ["right-click menu"] },
                { name: "Menubar", layout: ["horizontal"] },
                { name: "Carousel", orientation: ["horizontal", "vertical"] },
                { name: "Calendar", views: ["month", "year", "range"] },
                { name: "Command", use: ["search", "cmdk"] },
                { name: "Combobox", states: ["open", "closed", "loading"] },
                { name: "Toggle Group", variant: ["single", "multiple"], orientation: ["horizontal", "vertical"] },
                { name: "Input OTP", length: ["4", "6", "8 digits"] },
                { name: "Input Group", addon: ["leading", "trailing", "both"] },
                { name: "Field", validation: ["default", "with error", "with description"] },
                { name: "Native Select", size: ["default", "sm", "lg"] },
                { name: "ScrollArea", orientation: ["horizontal", "vertical", "both"] },
                { name: "Collapsible", state: ["expanded", "collapsed"] },
                { name: "Empty State", variant: ["no results", "error", "blank slate"] },
                { name: "Item", layout: ["with media", "with description"] },
              ].map((comp, i) => (
                <div key={i} className="p-4 border border-border hover:border-foreground/30 transition-colors">
                  <div className="font-bold text-sm mb-2">{comp.name}</div>
                  <div className="text-[11px] text-grey-500 space-y-1">
                    {comp.variants && <div>Variants: {comp.variants.join(", ")}</div>}
                    {comp.sizes && <div>Sizes: {comp.sizes.join(", ")}</div>}
                    {comp.states && <div>States: {comp.states.join(", ")}</div>}
                    {comp.types && <div>Types: {comp.types.join(", ")}</div>}
                    {comp.orientation && <div>Orientation: {comp.orientation.join(", ")}</div>}
                    {comp.position && <div>Position: {comp.position.join(", ")}</div>}
                    {comp.align && <div>Align: {comp.align.join(", ")}</div>}
                    {comp.direction && <div>Direction: {comp.direction.join(", ")}</div>}
                    {comp.addon && <div>Addon: {comp.addon.join(", ")}</div>}
                    {comp.validation && <div>Validation: {comp.validation.join(", ")}</div>}
                    {comp.views && <div>Views: {comp.views.join(", ")}</div>}
                    {comp.length && <div>Length: {comp.length.join(", ")}</div>}
                    {comp.variant && <div>Variant: {comp.variant.join(", ")}</div>}
                    {comp.trigger && <div>Trigger: {comp.trigger.join(", ")}</div>}
                    {comp.use && <div>Use: {comp.use.join(", ")}</div>}
                    {comp.layout && <div>Layout: {comp.layout.join(", ")}</div>}
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(comp as any).shape && <div>Shape: {(comp as any).shape.join(", ")}</div>}
                    {comp.shapes && <div>Shapes: {comp.shapes.join(", ")}</div>}
                    {comp.icons && <div>With Icons: Yes</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ════ CTA ════ */}
      <Section variant="dark" className="mt-20">
        <Container size="md" className="text-center">
          <h2 className="font-serif text-5xl font-bold mb-8 italic">Ready to build?</h2>
          <div className="flex justify-center gap-4">
            <Button href="/" variant="outline" className="border-background text-background hover:bg-background hover:text-foreground">Return Home</Button>
            <Button href="/#contact" variant="default">Contact Us</Button>
          </div>
        </Container>
      </Section>
    </div>
    </TooltipProvider>
  );
}
