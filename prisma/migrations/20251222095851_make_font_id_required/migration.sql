-- CreateTable
CREATE TABLE "favoritefonts" (
    "id_font" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "font_name" VARCHAR(100) NOT NULL,
    "font_variations" INTEGER,
    "font_type" TEXT,

    CONSTRAINT "favoritefonts_pkey" PRIMARY KEY ("id_font")
);

-- CreateTable
CREATE TABLE "fontlinks" (
    "id_link" SERIAL NOT NULL,
    "font_link" TEXT NOT NULL,
    "font_id" INTEGER NOT NULL,

    CONSTRAINT "fontlinks_pkey" PRIMARY KEY ("id_link")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100),
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "photo" TEXT,
    "plan_type" VARCHAR(100),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "favoritefonts" ADD CONSTRAINT "favoritefonts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "fontlinks" ADD CONSTRAINT "fontlinks_font_id_fkey" FOREIGN KEY ("font_id") REFERENCES "favoritefonts"("id_font") ON DELETE CASCADE ON UPDATE NO ACTION;
