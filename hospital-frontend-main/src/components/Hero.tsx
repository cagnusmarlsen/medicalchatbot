import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import  Chat  from "@/components/Chat";
import {  useState } from "react";
import { CalendarIcon, MenuIcon, SearchIcon, UserIcon, MessageCircleIcon, HospitalIcon, LayoutDashboardIcon, SettingsIcon } from "@/icons/Icons";

export default function Hero(props: any) {
    const [toggleChat, setToggleChat] = useState(false);

  const handleToggle = () => {
    setToggleChat(!toggleChat)
  }

  const patientData = props.patientData;
  const doctorData = patientData.doctor;

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 font-inter">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-white px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <a
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <HospitalIcon className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Clinic</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <LayoutDashboardIcon className="h-5 w-5" />
                  Dashboard
                </a>
                <a
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <UserIcon className="h-5 w-5" />
                  Profile
                </a>
                <a
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <CalendarIcon className="h-5 w-5" />
                  Interactions
                </a>
                <a
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <HospitalIcon className="h-5 w-5" />
                  Doctors
                </a>
                <a
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <SettingsIcon className="h-5 w-5" />
                  Settings
                </a>
              </nav>
            </SheetContent>
          </Sheet>
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <a href="#">Dashboard</a>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative ml-auto flex-1 md:grow-0">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search"
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <img
                  src="/placeholder.svg"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 text-left">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="font-semibold">{patientData.name}</div>
                    <div className="font-normal text-gray-500">
                      Patient ID: {patientData.patientId}
                    </div>
                  </div>
                </div>
                <div className="grid gap-1">
                  <div className="font-normal text-gray-500">Email</div>
                  <div>{patientData.email}</div>
                </div>
                <div className="grid gap-1">
                  <div className="font-normal text-gray-500">Phone</div>
                  <div>{patientData.phone}</div>
                </div>
                <div className="grid gap-1">
                  <div className="font-normal text-gray-500">Address</div>
                  <div>{patientData.address}</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Interactions</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>DR</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="font-semibold">Dr. Jane Smith</div>
                    <div className="font-normal text-gray-500">
                      Family Medicine
                    </div>
                  </div>
                </div>
                <div className="grid gap-1">
                  <div className="font-normal text-gray-500">Last Visit</div>
                  <div>June 15, 2023</div>
                </div>
                <div className="grid gap-1">
                  <div className="font-normal text-gray-500">Reason</div>
                  <div>Annual Checkup</div>
                </div>
                <div className="grid gap-1">
                  <div className="font-normal text-gray-500">Notes</div>
                  <div>Everything looks good, no concerns.</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Doctor</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>DR</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="font-semibold">{doctorData.name}</div>
                    <div className="font-normal text-gray-500">
                      {doctorData.specialty}
                    </div>
                  </div>
                </div>
                <div className="grid gap-1">
                  <div className="font-normal text-gray-500">Specialty</div>
                  <div>{doctorData.specialty}</div>
                </div>
                <div className="grid gap-1">
                  <div className="font-normal text-gray-500">Contact</div>
                  <div>
                    <p>{doctorData.contact}</p>
                  </div>
                </div>
                <div className="grid gap-1">
                  <div className="font-normal text-gray-500">Location</div>
                  <div>{doctorData.location}</div>
                </div>
              </CardContent>
            </Card>
            {/* <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>DR</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="font-semibold">Dr. Jane Smith</div>
                    <div className="font-normal text-gray-500">
                      Family Medicine
                    </div>
                  </div>
                </div>
                <div className="grid gap-1">
                  <div className="font-normal text-gray-500">Date</div>
                  <div>July 15, 2023</div>
                </div>
                <div className="grid gap-1">
                  <div className="font-normal text-gray-500">Time</div>
                  <div>2:00 PM</div>
                </div>
                <div className="grid gap-1">
                  <div className="font-normal text-gray-500">Reason</div>
                  <div>Follow-up Visit</div>
                </div>
              </CardContent>
            </Card> */}
          </div>
          <div className="fixed left-1/2 -translate-x-1/2 w-full max-w-2xl z-30">
            {toggleChat ? <Chat toggle={handleToggle}></Chat> : <></>}  
          </div>
          <Button variant="ghost" onClick={handleToggle} className="fixed bottom-4 right-4 rounded-full border-black">
            <MessageCircleIcon className="h-6 w-6" />
          </Button>
        </main>
      </div>
    </div>
  );
}
