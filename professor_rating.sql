--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: professor_rating; Type: DATABASE; Schema: -; Owner: adenmengistie
--

CREATE DATABASE professor_rating WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = icu LOCALE = 'en_US.UTF-8' ICU_LOCALE = 'en-US';


ALTER DATABASE professor_rating OWNER TO adenmengistie;

\connect professor_rating

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: professor; Type: TABLE; Schema: public; Owner: adenmengistie
--

CREATE TABLE public.professor (
    professor_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    school_id uuid NOT NULL,
    professor_name character varying(250) NOT NULL,
    department character varying(300) NOT NULL
);


ALTER TABLE public.professor OWNER TO adenmengistie;

--
-- Name: review; Type: TABLE; Schema: public; Owner: adenmengistie
--

CREATE TABLE public.review (
    review_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    professor_id uuid NOT NULL,
    usr_id uuid NOT NULL,
    date character varying(50) NOT NULL,
    review_description text NOT NULL,
    attendance boolean NOT NULL,
    textbook boolean NOT NULL,
    for_credit boolean NOT NULL,
    grade character varying(20),
    would_take_again boolean NOT NULL,
    quality numeric(2,1) NOT NULL,
    difficulty numeric(2,1) NOT NULL,
    rating integer NOT NULL,
    course_name character varying(200) NOT NULL,
    CONSTRAINT difficulty_check CHECK (((difficulty >= 1.0) AND (difficulty <= 5.0))),
    CONSTRAINT quality_check CHECK (((quality >= 1.0) AND (quality <= 5.0))),
    CONSTRAINT rating_check CHECK (((rating > 0) AND (rating <= 5)))
);


ALTER TABLE public.review OWNER TO adenmengistie;

--
-- Name: school; Type: TABLE; Schema: public; Owner: adenmengistie
--

CREATE TABLE public.school (
    school_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    school_name character varying(200) NOT NULL
);


ALTER TABLE public.school OWNER TO adenmengistie;

--
-- Name: usr; Type: TABLE; Schema: public; Owner: adenmengistie
--

CREATE TABLE public.usr (
    usr_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    expected_yr_graduation character varying(20),
    email character varying(200) NOT NULL,
    password character varying(200) NOT NULL
);


ALTER TABLE public.usr OWNER TO adenmengistie;

--
-- Data for Name: professor; Type: TABLE DATA; Schema: public; Owner: adenmengistie
--

COPY public.professor (professor_id, school_id, professor_name, department) FROM stdin;
284e28e9-8535-4bcb-b9dd-53802baab887	9d041ced-c16e-469b-a86f-2fff5783e06c	Silvia Smith	Computer Science
7ed0a90e-24d7-4c0e-8bc3-7292b029cda6	ccd8f6bb-c111-46e3-b6d2-3eba614cf421	Sam Smith	Arts
4e9314d6-f110-4a63-9470-90a8604e7c18	9d041ced-c16e-469b-a86f-2fff5783e06c	Frank Thomas	Science
13bff578-b8a5-4c28-8d64-8ef3086d5a99	ccd8f6bb-c111-46e3-b6d2-3eba614cf421	John Doe	Robotics
\.


--
-- Data for Name: review; Type: TABLE DATA; Schema: public; Owner: adenmengistie
--

COPY public.review (review_id, professor_id, usr_id, date, review_description, attendance, textbook, for_credit, grade, would_take_again, quality, difficulty, rating, course_name) FROM stdin;
56cdee8c-5301-411c-8cce-8dffaa2ec0f8	284e28e9-8535-4bcb-b9dd-53802baab887	2397abee-dda3-40c1-aa45-ac7b938c018a	5/15/2023	Amazing Professor	t	f	t	\N	t	4.0	4.0	4	Calculus 1A
a8171547-c62d-4b5a-872d-b9a34c452b02	7ed0a90e-24d7-4c0e-8bc3-7292b029cda6	2397abee-dda3-40c1-aa45-ac7b938c018a	5/15/2023	Long lectures	f	t	t	\N	f	3.0	5.0	1	History of Arts
2d1f3a04-8794-435a-b6c4-fc7383e5efc0	284e28e9-8535-4bcb-b9dd-53802baab887	41713e41-3973-4f49-a2da-32b789a3d8e4	5/15/2023	This is the best professor I had in De Anza. :)	t	f	t	\N	t	5.0	3.0	5	Math 2B
fef01c04-fdef-4260-8293-1fc2c140c12c	284e28e9-8535-4bcb-b9dd-53802baab887	2397abee-dda3-40c1-aa45-ac7b938c018a	5/16/2023	Take this professor if you plan to put in the work. The course is extremely difficult.	t	t	t	\N	t	3.0	2.0	3	Physics 1A
0648a1b9-ec9f-4558-a75f-e691d7629553	4e9314d6-f110-4a63-9470-90a8604e7c18	2397abee-dda3-40c1-aa45-ac7b938c018a	5/16/2023	This was an amazing experience. :)	f	f	t	\N	t	4.0	2.0	4	Environmental Science
\.


--
-- Data for Name: school; Type: TABLE DATA; Schema: public; Owner: adenmengistie
--

COPY public.school (school_id, school_name) FROM stdin;
9d041ced-c16e-469b-a86f-2fff5783e06c	De Anza College
d538dc5d-0162-4f99-9b44-381adf2d304b	West Valley College
bce90a5e-425b-4dae-8bfe-e380700ef816	San Jose City College
ccd8f6bb-c111-46e3-b6d2-3eba614cf421	San Jose State University
8fab9e26-7806-472e-ae30-dcd803327474	UCLA
945fa45e-0b7b-4c6a-be5b-3aaf07543666	Berkeley
f1f2e984-3acd-4e0a-bd7e-30f53aa9fdfd	Evergeen College
045ea1cd-be83-43d2-9ca5-602b64287c2a	San Diego State University
0a1dc611-6eac-4448-989a-d5dd57856390	Mission College
\.


--
-- Data for Name: usr; Type: TABLE DATA; Schema: public; Owner: adenmengistie
--

COPY public.usr (usr_id, first_name, last_name, expected_yr_graduation, email, password) FROM stdin;
2397abee-dda3-40c1-aa45-ac7b938c018a	Sam	Smith	\N	sam_smith@aol.com	hello
81789d53-12cf-46de-bbb9-732e23643fc1	Mel	Smith	\N	hello@gmail.com	hello
0662568f-8c8d-4312-bcad-ca78790c142d	John	Doe	\N	john@gmail.com	hello
41713e41-3973-4f49-a2da-32b789a3d8e4	Aden	Mengistie	\N	aden@gmail.com	hello
50d5b187-d4d0-4315-a132-d9099ab5b829	Sam	Doe	\N	doe@gmail.com	hello
\.


--
-- Name: usr email_unique_constraint; Type: CONSTRAINT; Schema: public; Owner: adenmengistie
--

ALTER TABLE ONLY public.usr
    ADD CONSTRAINT email_unique_constraint UNIQUE (email);


--
-- Name: professor professor_pkey; Type: CONSTRAINT; Schema: public; Owner: adenmengistie
--

ALTER TABLE ONLY public.professor
    ADD CONSTRAINT professor_pkey PRIMARY KEY (professor_id);


--
-- Name: review review_pkey; Type: CONSTRAINT; Schema: public; Owner: adenmengistie
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_pkey PRIMARY KEY (review_id);


--
-- Name: school school_pkey; Type: CONSTRAINT; Schema: public; Owner: adenmengistie
--

ALTER TABLE ONLY public.school
    ADD CONSTRAINT school_pkey PRIMARY KEY (school_id);


--
-- Name: school school_school_name_key; Type: CONSTRAINT; Schema: public; Owner: adenmengistie
--

ALTER TABLE ONLY public.school
    ADD CONSTRAINT school_school_name_key UNIQUE (school_name);


--
-- Name: usr usr_pkey; Type: CONSTRAINT; Schema: public; Owner: adenmengistie
--

ALTER TABLE ONLY public.usr
    ADD CONSTRAINT usr_pkey PRIMARY KEY (usr_id);


--
-- Name: professor professor_school_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: adenmengistie
--

ALTER TABLE ONLY public.professor
    ADD CONSTRAINT professor_school_id_fkey FOREIGN KEY (school_id) REFERENCES public.school(school_id);


--
-- Name: review review_professor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: adenmengistie
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_professor_id_fkey FOREIGN KEY (professor_id) REFERENCES public.professor(professor_id) ON DELETE CASCADE;


--
-- Name: review review_usr_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: adenmengistie
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_usr_id_fkey FOREIGN KEY (usr_id) REFERENCES public.usr(usr_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

