import { PrismaClient, PublicStatus } from "@prisma/client";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
import { motorcycles, vehicles, tours, routes, faqs } from "../src/lib/content";

config({ path: ".env.local" });
config();

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || "MotorideAdmin2026!", 10);

  await prisma.user.upsert({
    where: { email: "admin@pamirmotoride.com" },
    update: { passwordHash, role: "ADMIN", active: true },
    create: {
      email: "admin@pamirmotoride.com",
      name: "Administrator",
      passwordHash,
      role: "ADMIN",
    },
  });

  await prisma.user.upsert({
    where: { email: "sales@pamirmotoride.com" },
    update: { passwordHash, role: "SALES" },
    create: {
      email: "sales@pamirmotoride.com",
      name: "Sales",
      passwordHash,
      role: "SALES",
    },
  });

  for (const bike of motorcycles) {
    const record = await prisma.motorcycle.upsert({
      where: { slug: bike.slug },
      update: {
        model: bike.model,
        unitCount: bike.unitCount,
        specs: bike.specs,
        recommendedUse: bike.recommendedUse,
        equipment: bike.equipment,
        optionalServices: bike.optionalServices,
        priceNote: bike.priceNote,
        depositNote: bike.depositNote,
        publicStatus: bike.publicStatus as PublicStatus,
        images: bike.images,
      },
      create: {
        slug: bike.slug,
        model: bike.model,
        unitCount: bike.unitCount,
        specs: bike.specs,
        recommendedUse: bike.recommendedUse,
        equipment: bike.equipment,
        optionalServices: bike.optionalServices,
        priceNote: bike.priceNote,
        depositNote: bike.depositNote,
        publicStatus: bike.publicStatus as PublicStatus,
        images: bike.images,
      },
    });
    for (let i = 1; i <= bike.unitCount; i += 1) {
      const unitNumber = `CRF-${String(i).padStart(2, "0")}`;
      await prisma.motorcycleUnit.upsert({
        where: { motorcycleId_unitNumber: { motorcycleId: record.id, unitNumber } },
        update: { active: true },
        create: {
          motorcycleId: record.id,
          unitNumber,
          registration: `TJ-${1000 + i}`,
          mileage: 1200 * i,
          maintenanceStatus: "ready",
        },
      });
    }
  }

  for (const car of vehicles) {
    await prisma.vehicle.upsert({
      where: { slug: car.slug },
      update: {
        category: car.category,
        make: car.make,
        model: car.model,
        year: car.year,
        transmission: car.transmission,
        driveType: car.driveType,
        fuel: car.fuel,
        passengers: car.passengers,
        luggage: car.luggage,
        routeSuitability: car.routeSuitability,
        serviceOptions: car.serviceOptions,
        priceNote: car.priceNote,
        depositNote: car.depositNote,
        minDays: car.minDays,
        publicStatus: car.publicStatus as PublicStatus,
        images: car.images,
      },
      create: {
        slug: car.slug,
        category: car.category,
        make: car.make,
        model: car.model,
        year: car.year,
        transmission: car.transmission,
        driveType: car.driveType,
        fuel: car.fuel,
        passengers: car.passengers,
        luggage: car.luggage,
        routeSuitability: car.routeSuitability,
        serviceOptions: car.serviceOptions,
        priceNote: car.priceNote,
        depositNote: car.depositNote,
        minDays: car.minDays,
        publicStatus: car.publicStatus as PublicStatus,
        images: car.images,
      },
    });
  }

  for (const tour of tours) {
    await prisma.tour.upsert({
      where: { slug: tour.slug },
      update: {
        type: tour.type,
        title: tour.title,
        summary: tour.summary,
        durationDays: tour.durationDays,
        dates: tour.dates,
        groupSize: tour.groupSize,
        vehicleType: tour.vehicleType,
        difficulty: tour.difficulty,
        distanceKm: tour.distanceKm,
        dailyRidingHours: tour.dailyRidingHours,
        highestAltitude: tour.highestAltitude,
        surface: tour.surface,
        itinerary: tour.itinerary,
        inclusions: tour.inclusions,
        exclusions: tour.exclusions,
        priceBasis: tour.priceBasis,
        images: tour.images,
      },
      create: {
        slug: tour.slug,
        type: tour.type,
        title: tour.title,
        summary: tour.summary,
        durationDays: tour.durationDays,
        dates: tour.dates,
        groupSize: tour.groupSize,
        vehicleType: tour.vehicleType,
        difficulty: tour.difficulty,
        distanceKm: tour.distanceKm,
        dailyRidingHours: tour.dailyRidingHours,
        highestAltitude: tour.highestAltitude,
        surface: tour.surface,
        itinerary: tour.itinerary,
        inclusions: tour.inclusions,
        exclusions: tour.exclusions,
        priceBasis: tour.priceBasis,
        images: tour.images,
      },
    });
  }

  for (const route of routes) {
    await prisma.routePage.upsert({
      where: { slug: route.slug },
      update: {
        title: route.title,
        summary: route.summary,
        startFinish: route.startFinish,
        season: route.season,
        roadConditions: route.roadConditions,
        experience: route.experience,
        permits: route.permits,
        supportOptions: route.supportOptions,
        images: route.images,
      },
      create: {
        slug: route.slug,
        title: route.title,
        summary: route.summary,
        startFinish: route.startFinish,
        season: route.season,
        roadConditions: route.roadConditions,
        experience: route.experience,
        permits: route.permits,
        supportOptions: route.supportOptions,
        images: route.images,
      },
    });
  }

  await prisma.faq.deleteMany();
  await prisma.faq.createMany({
    data: faqs.map((item, index) => ({
      category: item.category,
      question: item.question,
      answer: item.answer,
      sortOrder: index,
    })),
  });

  await prisma.setting.upsert({
    where: { id: "site" },
    update: {},
    create: {
      id: "site",
      data: {
        email: "bookings@pamirmotoride.com",
        phone: "+992 93 500 11 22",
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
