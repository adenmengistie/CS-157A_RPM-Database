PGDMP     "                    {           professor_rating    15.2    15.2     E           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            F           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            G           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            H           1262    16390    professor_rating    DATABASE     �   CREATE DATABASE professor_rating WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = icu LOCALE = 'en_US.UTF-8' ICU_LOCALE = 'en-US';
     DROP DATABASE professor_rating;
                adenmengistie    false                        3079    16600 	   uuid-ossp 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    DROP EXTENSION "uuid-ossp";
                   false            I           0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
                        false    2            �            1259    16551 	   professor    TABLE     �   CREATE TABLE public.professor (
    professor_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    school_id uuid NOT NULL,
    professor_name character varying(250) NOT NULL,
    department character varying(300) NOT NULL
);
    DROP TABLE public.professor;
       public         heap    adenmengistie    false    2            �            1259    16578    review    TABLE       CREATE TABLE public.review (
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
    DROP TABLE public.review;
       public         heap    adenmengistie    false    2            �            1259    16521    school    TABLE     �   CREATE TABLE public.school (
    school_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    school_name character varying(200) NOT NULL
);
    DROP TABLE public.school;
       public         heap    adenmengistie    false    2            �            1259    16526    usr    TABLE     B  CREATE TABLE public.usr (
    usr_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    expected_yr_graduation character varying(20),
    email character varying(200) NOT NULL,
    password character varying(200) NOT NULL
);
    DROP TABLE public.usr;
       public         heap    adenmengistie    false    2            A          0    16551 	   professor 
   TABLE DATA           X   COPY public.professor (professor_id, school_id, professor_name, department) FROM stdin;
    public          adenmengistie    false    217   �       B          0    16578    review 
   TABLE DATA           �   COPY public.review (review_id, professor_id, usr_id, date, review_description, attendance, textbook, for_credit, grade, would_take_again, quality, difficulty, rating, course_name) FROM stdin;
    public          adenmengistie    false    218   K       ?          0    16521    school 
   TABLE DATA           8   COPY public.school (school_id, school_name) FROM stdin;
    public          adenmengistie    false    215   ^       @          0    16526    usr 
   TABLE DATA           e   COPY public.usr (usr_id, first_name, last_name, expected_yr_graduation, email, password) FROM stdin;
    public          adenmengistie    false    216   y        �           2606    16643    usr email_unique_constraint 
   CONSTRAINT     W   ALTER TABLE ONLY public.usr
    ADD CONSTRAINT email_unique_constraint UNIQUE (email);
 E   ALTER TABLE ONLY public.usr DROP CONSTRAINT email_unique_constraint;
       public            adenmengistie    false    216            �           2606    16557    professor professor_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.professor
    ADD CONSTRAINT professor_pkey PRIMARY KEY (professor_id);
 B   ALTER TABLE ONLY public.professor DROP CONSTRAINT professor_pkey;
       public            adenmengistie    false    217            �           2606    16584    review review_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_pkey PRIMARY KEY (review_id);
 <   ALTER TABLE ONLY public.review DROP CONSTRAINT review_pkey;
       public            adenmengistie    false    218            �           2606    16525    school school_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.school
    ADD CONSTRAINT school_pkey PRIMARY KEY (school_id);
 <   ALTER TABLE ONLY public.school DROP CONSTRAINT school_pkey;
       public            adenmengistie    false    215            �           2606    16628    school school_school_name_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.school
    ADD CONSTRAINT school_school_name_key UNIQUE (school_name);
 G   ALTER TABLE ONLY public.school DROP CONSTRAINT school_school_name_key;
       public            adenmengistie    false    215            �           2606    16530    usr usr_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.usr
    ADD CONSTRAINT usr_pkey PRIMARY KEY (usr_id);
 6   ALTER TABLE ONLY public.usr DROP CONSTRAINT usr_pkey;
       public            adenmengistie    false    216            �           2606    16558 "   professor professor_school_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.professor
    ADD CONSTRAINT professor_school_id_fkey FOREIGN KEY (school_id) REFERENCES public.school(school_id);
 L   ALTER TABLE ONLY public.professor DROP CONSTRAINT professor_school_id_fkey;
       public          adenmengistie    false    215    217    3491            �           2606    16585    review review_professor_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_professor_id_fkey FOREIGN KEY (professor_id) REFERENCES public.professor(professor_id) ON DELETE CASCADE;
 I   ALTER TABLE ONLY public.review DROP CONSTRAINT review_professor_id_fkey;
       public          adenmengistie    false    217    3499    218            �           2606    16595    review review_usr_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_usr_id_fkey FOREIGN KEY (usr_id) REFERENCES public.usr(usr_id) ON DELETE CASCADE;
 C   ALTER TABLE ONLY public.review DROP CONSTRAINT review_usr_id_fkey;
       public          adenmengistie    false    3497    216    218            A   �   x�-�;�  �N�ց��R:!��ǎQG��7���R6$k@S� �0pS�)Q@�krS�Xri�� cL���"n^nߥ�uٮ��X���^�Y���jz��B�]Ē�bC�D{q"J�0�O��c	�(B2�%f����ON���/G����7      B     x���=n�0�Y>�/�D?�D�A�E�d�(��Ԁ��髦'��� @~^���J{h��+$#%["��<�L� �(�V���8r���*Ъ$M%V�X����n�u�x��֥�m[V��>r~�7�I�z�޷ٝ&�Z[c�tN�Up�]�7����U�%G�@���A�F+Y*�/֛Ԫ�lx�	PG���?��U�_�/ˀ^����m���MFq������9/}>��6��4}�E�{      ?     x�E��N1D��W�,Z��]�@��@C���QDt�.'$�z\%�o�MnH�j�jY�8��\�=���N/:�?����EOjZ��� -;��3�B>Yi�5�T�O�m�����%�!
P�T����Q{�<d�߮7������R�R���CT=n�aK�����ɦ�q9��z5&u)YCL�@�)�z�6j�{)�tܿ�L�Ѕ�#�8+�^�c�yz��[�3C!��6�˂@#B"�#�(A�&[��aqZU����'c�?�Sk�      @   �   x�eι�0�z�/�G|t)���I	��	�q�_$4 ���4RyK!%�����m��q'�HƲ����Q�mG��k�%�\'��W($ϨMLB�h�LR�fpI�+}vý���t��޸��Z	��)"�u����p��N5�c���6M�9�@�     