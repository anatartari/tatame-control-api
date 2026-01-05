import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialDB1767399361112 implements MigrationInterface {
    name = 'InitialDB1767399361112'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "street" character varying(255) NOT NULL, "neighborhood" character varying(255) NOT NULL, "cep" character varying(20) NOT NULL, "city" character varying(100), "state" character varying(50), "number" character varying(20), "complement" character varying(100), CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "medicalInfo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "preExistingCondition" text, "seriousInjury" text, "medicalRestriction" text, "heartCondition" text, "respiratoryIssues" text, "faintingEpisodes" text, "recentInjury" text, "jointProblems" text, "prosthetics" text, "allergies" text, "continuousMedication" text, "emergencyMedication" text, "seizureHistory" text, "majorSurgery" text, "physicalLimitation" text, "emergencyContactName" character varying(255) NOT NULL, "emergencyContactNumber" character varying(30) NOT NULL, "fitnessDeclaration" boolean NOT NULL, CONSTRAINT "PK_3d5eb01d1491ca627589ce0ad7a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "student" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "phone" character varying(20) NOT NULL, "gender" character varying(50), "birthday" date NOT NULL, "allowSocialMedia" boolean NOT NULL DEFAULT false, "instagram" character varying(255), "practicedMartialArts" boolean, "graduatedInStyle" character varying(255), "addressId" uuid, "medicalInfoId" uuid, CONSTRAINT "UQ_a56c051c91dbe1068ad683f536e" UNIQUE ("email"), CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "value" numeric(10,2) NOT NULL, "date" date NOT NULL, "referenceMonth" integer NOT NULL, CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "registration" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "status" character varying(50) NOT NULL DEFAULT 'ACTIVE', "studentId" uuid, "sportId" uuid, CONSTRAINT "UQ_8ff429aa398ce8bbf42818e0491" UNIQUE ("studentId", "sportId"), CONSTRAINT "PK_cb23dc9d28df8801b15e9e2b8d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sport" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying(50) NOT NULL, "sensei" character varying(255) NOT NULL, "price" numeric(10,2) NOT NULL, "dayOfWeek" character varying(50) NOT NULL, "startTime" TIME NOT NULL, "endTime" TIME NOT NULL, "active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_c67275331afac347120a1032825" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "registrationPayment" ("registrationId" uuid NOT NULL, "paymentId" uuid NOT NULL, CONSTRAINT "PK_72d9df0521917ea8edcb5922a20" PRIMARY KEY ("registrationId", "paymentId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_86ee57865e08d3e24f730708a5" ON "registrationPayment" ("registrationId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d15ae3be3e9cb1f4c1250049fd" ON "registrationPayment" ("paymentId") `);
        // Custom indexes for performance optimization
        await queryRunner.query(`CREATE INDEX "idx_student_email" ON "student"("email")`);
        await queryRunner.query(`CREATE INDEX "idx_student_phone" ON "student"("phone")`);
        await queryRunner.query(`CREATE INDEX "idx_registration_student_id" ON "registration"("studentId")`);
        await queryRunner.query(`CREATE INDEX "idx_registration_sport_id" ON "registration"("sportId")`);
        
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_80c67d4f34e198c99bdcdfc0d42" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_33e9223b7c076a20f6e0ac755fe" FOREIGN KEY ("medicalInfoId") REFERENCES "medicalInfo"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "registration" ADD CONSTRAINT "FK_6c992d9c3648892e1b553fb12ce" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "registration" ADD CONSTRAINT "FK_7ce7bddab2f6199131ab074149a" FOREIGN KEY ("sportId") REFERENCES "sport"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "registrationPayment" ADD CONSTRAINT "FK_86ee57865e08d3e24f730708a54" FOREIGN KEY ("registrationId") REFERENCES "registration"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "registrationPayment" ADD CONSTRAINT "FK_d15ae3be3e9cb1f4c1250049fd6" FOREIGN KEY ("paymentId") REFERENCES "payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "registrationPayment" DROP CONSTRAINT "FK_d15ae3be3e9cb1f4c1250049fd6"`);
        await queryRunner.query(`ALTER TABLE "registrationPayment" DROP CONSTRAINT "FK_86ee57865e08d3e24f730708a54"`);
        await queryRunner.query(`ALTER TABLE "registration" DROP CONSTRAINT "FK_7ce7bddab2f6199131ab074149a"`);
        await queryRunner.query(`ALTER TABLE "registration" DROP CONSTRAINT "FK_6c992d9c3648892e1b553fb12ce"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_33e9223b7c076a20f6e0ac755fe"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_80c67d4f34e198c99bdcdfc0d42"`);
        // Drop custom indexes
        await queryRunner.query(`DROP INDEX "public"."idx_registration_sport_id"`);
        await queryRunner.query(`DROP INDEX "public"."idx_registration_student_id"`);
        await queryRunner.query(`DROP INDEX "public"."idx_student_phone"`);
        await queryRunner.query(`DROP INDEX "public"."idx_student_email"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d15ae3be3e9cb1f4c1250049fd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_86ee57865e08d3e24f730708a5"`);
        await queryRunner.query(`DROP TABLE "registrationPayment"`);
        await queryRunner.query(`DROP TABLE "sport"`);
        await queryRunner.query(`DROP TABLE "registration"`);
        await queryRunner.query(`DROP TABLE "payment"`);
        await queryRunner.query(`DROP TABLE "student"`);
        await queryRunner.query(`DROP TABLE "medicalInfo"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
