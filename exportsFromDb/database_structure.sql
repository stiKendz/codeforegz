--
-- PostgreSQL database dump
--

\restrict YeyhJ4gzudFD5DcODoSc0pacLhWPJwPsZKxlKfznM08DD76KBBAyDqG7qLlMp0k

-- Dumped from database version 17.8
-- Dumped by pg_dump version 17.8

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: partner_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.partner_types (
    partner_type_id integer NOT NULL,
    type_name character varying(100) NOT NULL
);


ALTER TABLE public.partner_types OWNER TO postgres;

--
-- Name: partner_types_partner_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.partner_types_partner_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.partner_types_partner_type_id_seq OWNER TO postgres;

--
-- Name: partner_types_partner_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.partner_types_partner_type_id_seq OWNED BY public.partner_types.partner_type_id;


--
-- Name: partners; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.partners (
    partner_id integer NOT NULL,
    name character varying(255) NOT NULL,
    partner_type_id integer NOT NULL,
    rating integer NOT NULL,
    address text NOT NULL,
    director_name character varying(255) NOT NULL,
    phone character varying(20) NOT NULL,
    email character varying(100) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT partners_rating_check CHECK ((rating >= 0))
);


ALTER TABLE public.partners OWNER TO postgres;

--
-- Name: partners_partner_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.partners_partner_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.partners_partner_id_seq OWNER TO postgres;

--
-- Name: partners_partner_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.partners_partner_id_seq OWNED BY public.partners.partner_id;


--
-- Name: product_sales; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_sales (
    sale_id integer NOT NULL,
    partner_id integer NOT NULL,
    product_name character varying(255) NOT NULL,
    quantity integer NOT NULL,
    sale_date date NOT NULL,
    CONSTRAINT product_sales_quantity_check CHECK ((quantity > 0))
);


ALTER TABLE public.product_sales OWNER TO postgres;

--
-- Name: product_sales_sale_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_sales_sale_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_sales_sale_id_seq OWNER TO postgres;

--
-- Name: product_sales_sale_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_sales_sale_id_seq OWNED BY public.product_sales.sale_id;


--
-- Name: partner_types partner_type_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partner_types ALTER COLUMN partner_type_id SET DEFAULT nextval('public.partner_types_partner_type_id_seq'::regclass);


--
-- Name: partners partner_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partners ALTER COLUMN partner_id SET DEFAULT nextval('public.partners_partner_id_seq'::regclass);


--
-- Name: product_sales sale_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_sales ALTER COLUMN sale_id SET DEFAULT nextval('public.product_sales_sale_id_seq'::regclass);


--
-- Name: partner_types partner_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partner_types
    ADD CONSTRAINT partner_types_pkey PRIMARY KEY (partner_type_id);


--
-- Name: partner_types partner_types_type_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partner_types
    ADD CONSTRAINT partner_types_type_name_key UNIQUE (type_name);


--
-- Name: partners partners_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partners
    ADD CONSTRAINT partners_pkey PRIMARY KEY (partner_id);


--
-- Name: product_sales product_sales_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_sales
    ADD CONSTRAINT product_sales_pkey PRIMARY KEY (sale_id);


--
-- Name: partners partners_partner_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partners
    ADD CONSTRAINT partners_partner_type_id_fkey FOREIGN KEY (partner_type_id) REFERENCES public.partner_types(partner_type_id);


--
-- Name: product_sales product_sales_partner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_sales
    ADD CONSTRAINT product_sales_partner_id_fkey FOREIGN KEY (partner_id) REFERENCES public.partners(partner_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict YeyhJ4gzudFD5DcODoSc0pacLhWPJwPsZKxlKfznM08DD76KBBAyDqG7qLlMp0k

