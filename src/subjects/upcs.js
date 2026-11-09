/* Předmět: Úvod do počítačových sítí
 * Každý předmět = jeden soubor v src/subjects/. Šablona: src/subjects/_sablona.js.txt
 * Otázka: [téma, otázka, správná odpověď, [3 špatné odpovědi], vysvětlení nebo null]
 */
Biflovna.subject({
  id: "upcs",
  name: "Úvod do počítačových sítí",
  short: "ÚPS",
  teacher: "Ing. Zdeněk Votruba, Ph.D.",
  note: "Zápočet · přednášky 1–6",
  color: "#1D4ED8",
  icon: "net",
  legacyStorage: "kvizSiteStats_v1",

  topics: {
  zak:{n:"Základní pojmy",                 c:"#3B82F6"},
  osi:{n:"OSI, TCP/IP, TCP/UDP",           c:"#6366F1"},
  pro:{n:"Aplikační protokoly",            c:"#DB2777"},
  adr:{n:"Adresace MAC/IPv4/IPv6",         c:"#059669"},
  msk:{n:"Maska, subnetting, DHCP",        c:"#D97706"},
  dns:{n:"DNS a URL",                      c:"#0891B2"},
  prv:{n:"Aktivní/pasivní prvky",          c:"#EA580C"},
  nat:{n:"Switch, router, NAT, firewall",  c:"#DC2626"},
  kab:{n:"Koax a kroucená dvoulinka",      c:"#65A30D"},
  opt:{n:"Optika",                         c:"#0284C7"},
  wif:{n:"Bezdrát, WiFi, FSO",             c:"#C026D3"},
},

  questions: [
// ---------- ZÁKLADNÍ POJMY (14) ----------
["zak","Co je počítačová síť?","Propojení několika uzlů (nodes), které spolu komunikují",["Jeden výkonný počítač se sdíleným diskem","Soubor programů pro přístup na Internet","Pouze kabeláž v budově"],"Uzlům se říká také stanice (workstations)."],
["zak","Co znamená zkratka NIC?","Network Interface Card – síťová karta",["Network Internet Connection","Node Identification Code","Network Integrated Controller"],null],
["zak","Funkční síť = ?","HW + komunikační protokol",["HW + operační systém","HW + DNS server","Kabely + router"],"Funkční PC = HW + OS, funkční síť = HW + komunikační protokol."],
["zak","Co NEPATŘÍ mezi tři principy přenosu dat sítí?","Šifrování všech přenášených dat",["Rozdělení dat na pakety","Jednoznačné adresy odesílatele i adresáta","Univerzální přenosový protokol"],"Tři principy: PAKETY, ADRESY, PROTOKOL."],
["zak","Proč se data při přenosu dělí na pakety?","Aby neucpávaly síť",["Aby byla automaticky šifrovaná","Aby se nemusela adresovat","Protože kabel neumí přenést víc než 1 bajt"],null],
["zak","Co je podle přednášky LIMITUJÍCÍ faktor přenosu dat, a ne požadavek na něj?","Různorodost",["Množství přenášených dat","Univerzálnost přenosu","Spolehlivost doručení dat uživateli"],"Požadavky: množství, rychlost, spolehlivost, univerzálnost. Limity: rychlost média, různorodost, množství služeb, spolehlivost a bezpečnost."],
["zak","Co je přenosový (komunikační) protokol?","Předpis (SW), podle kterého se navazuje spojení a zajišťuje přenos dat",["Fyzický kabel mezi dvěma počítači","Síťová karta s MAC adresou","Adresa počítače v síti"],"Je rozdělený do hierarchických vrstev a nezávisí na implementaci."],
["zak","Co NENÍ funkcí přenosového protokolu?","Přidělit uživateli heslo k e-mailu",["Detekovat okolní zařízení","Poznat začátek a konec paketu","Detekovat a opravit chyby"],"Funkce: detekce zařízení, atributy, začátek/konec paketu, formát paketu, detekce a oprava chyb, ukončení komunikace."],
["zak","Čím adresuje protokol IPX/SPX?","MAC adresami",["IP adresami","DNS jmény","URL adresami"],"Proto funguje jen v LAN (sítě Novell)."],
["zak","Co platí o IPX/SPX?","Je rychlý, cesta je dopředu známá, jen pro LAN, dnes na ústupu",["Je univerzální a používá ho celý Internet","Adresuje přes IP adresy","Hledá trasu mezi sítěmi"],null],
["zak","Co platí o TCP/IP?","Je univerzální, hledá trasu a jde o „rodinu protokolů“ (protocol suite)",["Funguje jen v LAN a cesta je předem známá","Adresuje pouze MAC adresami","Je to jediný protokol bez vrstev"],null],
["zak","Jaký je rozdíl mezi přenosovým a aplikačním protokolem?","Přenosový přenese data sítí, aplikační je předá konkrétní aplikaci",["Aplikační přenese data sítí, přenosový je předá aplikaci","Přenosový funguje jen v LAN, aplikační jen na Internetu","Žádný, jsou to synonyma"],"Přenosový: IP, IPX. Aplikační: HTTP, DNS, FTP…"],
["zak","Který z protokolů je PŘENOSOVÝ (ne aplikační)?","IP",["HTTP","DNS","FTP"],null],
["zak","Lokální síť běží na IPX a potřebuje se připojit k Internetu. Jak se to podle přednášky běžně řeší?","Počítače provozují současně IPX i TCP/IP",["Router přeloží MAC adresy z IPX na DNS jména","IPX pakety se beze změny pošlou do Internetu","IPX se nahradí protokolem UDP na linkové vrstvě"],"Počítače a sítě mohou fungovat na několika protokolech současně."],

// ---------- OSI / TCP/IP (21) ----------
["osi","Kolik vrstev má model OSI a kolik TCP/IP?","OSI 7, TCP/IP 4",["OSI 4, TCP/IP 7","Oba 7","OSI 5, TCP/IP 3"],null],
["osi","Které jsou vrstvy modelu TCP/IP?","Síťové rozhraní, síťová, transportní, aplikační",["Fyzická, linková, síťová, aplikační","Fyzická, relační, prezentační, aplikační","Linková, síťová, relační, aplikační"],null],
["osi","Která vrstva OSI zajišťuje logickou (IP) adresaci a směrování?","3. síťová",["2. linková","4. transportní","1. fyzická"],null],
["osi","Která vrstva OSI zajišťuje MAC adresaci, rámce a detekci chyb (CRC)?","2. linková (datového spoje)",["3. síťová","1. fyzická","4. transportní"],null],
["osi","Která vrstva OSI zajišťuje spolehlivé doručení, řízení toku a porty?","4. transportní",["3. síťová","5. relační","7. aplikační"],null],
["osi","Která vrstva OSI řeší formát dat, kódování, kompresi a šifrování?","6. prezentační",["5. relační","7. aplikační","2. linková"],null],
["osi","Která vrstva OSI řídí relaci (dialog)?","5. relační",["6. prezentační","4. transportní","7. aplikační"],null],
["osi","Jaká je jednotka dat na transportní vrstvě?","Segment",["Rámec","Paket","Bit"],"Transportní = segment, síťová = paket/datagram, linková = rámec, fyzická = bity."],
["osi","Jaká je jednotka dat na linkové vrstvě?","Rámec",["Segment","Paket","Bit"],"Transportní = segment, síťová = paket/datagram, linková = rámec, fyzická = bity."],
["osi","Kterým vrstvám TCP/IP odpovídají vrstvy OSI 5, 6 a 7?","Aplikační",["Transportní","Síťové","Síťovému rozhraní"],"OSI 1+2 = síťové rozhraní, 3 = síťová, 4 = transportní, 5–7 = aplikační."],
["osi","Na které vrstvě TCP/IP jsou Ethernet, Token Ring a FDDI?","Síťové rozhraní",["Síťová","Transportní","Aplikační"],null],
["osi","Který protokol NEPATŘÍ na síťovou vrstvu TCP/IP?","HTTP",["ARP","ICMP","IGMP"],"Síťová vrstva: IP, ARP, RARP, ICMP, IGMP, IGRP, IPSEC."],
["osi","Kde je implementována transportní vrstva TCP/IP?","Jen v koncových zařízeních",["Ve všech prvcích sítě","Jen v routerech","Jen ve switchích"],"Síťová vrstva je naopak ve všech prvcích sítě."],
["osi","Jaká služba je TCP?","Spojovaná a spolehlivá – naváže spojení, potvrzuje příjem, garantuje pořadí",["Nespojovaná a nespolehlivá – data jen vyšle bez navázání spojení a bez potvrzení","Spojovaná, ale nespolehlivá – naváže spojení, ale příjem nepotvrzuje ani nehlídá pořadí","Nespojovaná, ale hlídá pořadí – nepotvrzuje příjem, jen řadí datagramy"],null],
["osi","Co se může stát s datagramem UDP?","Může se ztratit, přehodit nebo dojít víckrát",["Nic, UDP vše garantuje","Vždy dojde právě jednou ve správném pořadí","Nemůže se ztratit, jen zpozdit"],null],
["osi","Online hra průběžně posílá polohu hráče. Proč se pro ni hodí UDP?","Počítá se se ztrátami a nevyplatí se znovu posílat staré zprávy",["Garantuje doručení všech zpráv ve správném pořadí","Před přenosem naváže spojení s každým z hráčů","Cílový uzel potvrzuje příjem každé části dat"],"Stejně tak VoIP. UDP dále DNS a DHCP (otázka–odpověď)."],
["osi","Na jednom serveru běží web i e-mail se stejnou IP adresou. Co odliší data pro každou službu?","Číslo portu",["MAC adresa síťové karty","Maska sítě serveru","Adresa brány v síti"],"Spojení určuje IP adresa, port a transportní protokol."],
["osi","Jak posílají data TCP a UDP?","TCP po menších částech, UDP celý blok v jednom datagramu",["TCP celý blok najednou, UDP po částech","Oba posílají jen po jednom bitu","Oba celý blok najednou"],null],
["osi","Co jsou porty?","Domluvená čísla, která rozlišují aplikace na jednom počítači",["Fyzické zdířky na síťové kartě","Jiné označení pro MAC adresu","Čísla podsítí"],null],
["osi","Čím je jednoznačně určeno síťové spojení aplikace?","IP adresou + portem + transportním protokolem",["MAC adresou + IP adresou","IP adresou + maskou","DNS jménem + URL"],null],
["osi","Který transportní protokol používá DNS?","TCP i UDP",["Jen TCP","Jen UDP","Ani jeden, jen IP"],null],

// ---------- APLIKAČNÍ PROTOKOLY (12) ----------
["pro","Který protokol dynamicky přiděluje IP adresy?","DHCP",["DNS","SNMP","NTP"],null],
["pro","Který protokol překládá doménová jména na IP adresy?","DNS",["DHCP","HTTP","ARP"],null],
["pro","Který protokol slouží k odesílání e-mailu?","SMTP",["POP3","IMAP","SNMP"],null],
["pro","Který protokol slouží ke stahování pošty z poštovního serveru?","POP3",["SMTP","FTP","NTP"],"IMAP = práce se zprávami přímo na serveru."],
["pro","Který protokol synchronizuje čas?","NTP",["SNMP","SMTP","NFS"],null],
["pro","Který protokol slouží ke správě síťových zařízení?","SNMP",["SMTP","NTP","SMB"],null],
["pro","Který protokol je zabezpečený vzdálený terminál?","SSH",["Telnet","FTP","TFTP"],"Telnet = nezabezpečený virtuální terminál."],
["pro","Který protokol slouží ke sdílení souborů a tiskáren ve Windows?","SMB",["NFS","NNTP","XMPP"],"NFS = sdílení souborů v Unixu."],
["pro","K čemu slouží NTLM?","Ověřování (autentizace) ve Windows",["Chat","Synchronizace času","Přenos WWW stránek"],null],
["pro","Uživatel odešle e-mail a příjemce si ho stáhne do počítače. Které protokoly se použijí?","SMTP pro odeslání, POP3 pro stažení",["POP3 pro odeslání, SMTP pro stažení","SNMP pro odeslání, FTP pro stažení","IMAP pro odeslání, NTP pro stažení"],null],
["pro","Co umožňuje WebDAV?","Práci se soubory přes HTTP",["Ověřování ve Windows","Chat","Překlad jmen na IP"],null],
["pro","Co je TFTP?","Jednoduchý protokol pro přenos souborů",["Zabezpečený terminál","Synchronizace času","Přenos WWW"],null],

// ---------- ADRESACE (23) ----------
["adr","Kolik bitů má MAC, IPv4 a IPv6 adresa?","48, 32, 128",["32, 48, 128","48, 64, 128","64, 32, 256"],null],
["adr","Jak se zapisuje MAC adresa?","6 dvojic hexa číslic, např. A0-48-1C-92-DB-CF",["4 oktety dekadicky, např. 192.168.0.1","8 skupin po 4 hexa číslicích","Slovní jméno, např. www.czu.cz"],null],
["adr","Jak se zapisuje IPv6 adresa?","8 skupin po 4 hexa číslicích",["4 oktety dekadicky","6 dvojic hexa číslic","16 oktetů dekadicky"],"Např. 2001:0718:1c01:0016:0214:22ff:fec9:0ca5"],
["adr","Kolik je přibližně IPv4 adres?","2^32 ≈ 4 × 10^9",["2^48 ≈ 2,8 × 10^14","2^128 ≈ 3 × 10^38","2^16 = 65 536"],null],
["adr","Kolik je přibližně IPv6 adres?","2^128 ≈ 3 × 10^38",["2^32 ≈ 4 × 10^9","2^48 ≈ 2,8 × 10^14","2^64 ≈ 1,8 × 10^19"],"Teoreticky ~6 × 10^23 adres na 1 m² zemského povrchu."],
["adr","Jaké je hlavní pravidlo adresace?","V jednom okamžiku nesmí být v síti dva uzly se stejnou adresou",["Každý uzel musí mít aspoň dvě IP adresy","Adresy se musí každou hodinu měnit","MAC a IP musí být stejně dlouhé"],null],
["adr","Dá se MAC adresa změnit?","Teoreticky je neměnná, prakticky jde změnit",["Nikdy, je vypálená napevno","Mění se při každém restartu","Přiděluje ji DHCP server"],null],
["adr","K čemu se MAC adresa v TCP/IP dnes NEPOUŽÍVÁ?","Ke směrování paketů mezi sítěmi na Internetu",["K přeskoku mezi dvěma sousedními uzly","K identifikaci zařízení při přidělování IP z DHCP","K filtrování a firewallu"],"MAC: přeskok mezi sousedy, identifikace pro DHCP, filtrování/firewall, ověření připojení (WiFi)."],
["adr","Co platí o IP adresách a rozhraních?","Jedno rozhraní může mít víc IP, ale stejná IP nesmí být na víc rozhraních",["Stejná IP může být na víc rozhraních","Rozhraní smí mít jen jednu IP","IP adresa nemusí být v síti jednoznačná"],null],
["adr","Co NEPATŘÍ mezi nástroje proti nedostatku IPv4 adres?","DNS",["DHCP","Subnetting a CIDR","NAT a PAT"],"DHCP, subnetting/CIDR, NAT/PAT problém jen zmírňují – skutečné řešení je IPv6."],
["adr","Která adresa je PRIVÁTNÍ?","172.20.5.1",["172.32.0.1","192.169.1.1","11.0.0.1"],"Privátní B: 172.16.0.0 – 172.31.255.255."],
["adr","Která adresa je VEŘEJNÁ?","172.15.10.10",["10.200.1.1","192.168.50.5","172.31.255.254"],"172.15.x.x je těsně pod privátním rozsahem 172.16–172.31."],
["adr","Která z adres NEPATŘÍ do privátního rozsahu?","192.167.1.1",["192.168.1.1","10.0.0.138","172.16.0.1"],null],
["adr","Jaký je rozsah privátních adres třídy A?","10.0.0.0 – 10.255.255.255",["172.16.0.0 – 172.31.255.255","192.168.0.0 – 192.168.255.255","100.0.0.0 – 100.255.255.255"],null],
["adr","Jaký je rozsah privátních adres třídy B?","172.16.0.0 – 172.31.255.255",["172.0.0.0 – 172.255.255.255","172.16.0.0 – 172.16.255.255","10.0.0.0 – 10.255.255.255"],"16 × 65 536 adres."],
["adr","Jaký je rozsah privátních adres třídy C?","192.168.0.0 – 192.168.255.255",["192.0.0.0 – 192.255.255.255","192.168.0.0 – 192.168.0.255","172.16.0.0 – 172.31.255.255"],"256 × 256 adres."],
["adr","Co platí o veřejné IP adrese?","Je dostupná z celého Internetu, větší riziko útoku, potřebuje kvalitní firewall",["Je dostupná jen z vnitřní sítě až k routeru, proto nepotřebuje firewall","Nepotřebuje žádný firewall, protože ji chrání NAT poskytovatele","Na veřejné síti se okamžitě zahodí a musí se překládat přes APIPA"],null],
["adr","Co se stane s paketem s privátní adresou odesílatele na veřejné síti?","Hned se zahodí",["Normálně se doručí","Router mu přidělí APIPA","Pošle se na všechny porty"],null],
["adr","Kam jde paket směřující ven z privátní sítě?","Na bránu (NAT)",["Na DNS server","Na všechny uzly v síti","Na DHCP server"],null],
["adr","Kdy si zařízení přidělí APIPA adresu a jaký má rozsah?","Když nedostane IP od DHCP; 169.254.x.x",["Když se připojí k WiFi; 192.168.x.x","Při statické IP; 10.0.x.x","Když selže DNS; 127.0.x.x"],"Zařízení pak hledá DHCP dál – každé 3 minuty."],
["adr","Co funguje, když má počítač APIPA adresu?","Lokální služby, ale komunikace mimo počítač ne",["Vše včetně Internetu","Jen Internet, lokální služby ne","Komunikace v LAN i přes bránu"],null],
["adr","Počítač má adresu 169.254.12.7 a nefunguje mu nic mimo něj. Co je nejpravděpodobnější příčina?","Nedostal adresu od DHCP serveru",["DNS server přeložil jméno na špatnou IP","Router mu přidělil veřejnou IP adresu","Má nastavenou masku podsítě /30"],"APIPA se použije, když zařízení nezíská adresu z DHCP; server pak hledá každé 3 minuty."],
["adr","MAC má víc kombinací než IPv4. Proč tedy potřebujeme IP adresy?","MAC adresy nejsou hierarchické, nejde podle nich hledat cestu mezi sítěmi",["Protože MAC adresy jsou příliš krátké","Protože MAC se nedá zapsat hexadecimálně","Protože MAC funguje jen bezdrátově"],"Proto IPX/SPX (adresuje MAC) funguje jen v LAN."],

// ---------- MASKA, SUBNETTING, DHCP (23) ----------
["msk","Jaké parametry síťového připojení má každé zařízení?","IP adresa, maska, brána, adresa DHCP, adresa DNS",["IP adresa, MAC, port, URL","Jen IP adresa a MAC","Maska, URL, heslo k WiFi"],null],
["msk","Co v masce označují jedničky a co nuly?","Jedničky část sítě, nuly část počítače",["Jedničky část počítače, nuly část sítě","Jedničky bránu, nuly broadcast","Jedničky veřejné adresy, nuly privátní"],"Maska má 32 bitů jako IPv4 a určuje rozsah vnitřní sítě."],
["msk","Co musí mít všechna zařízení v jedné síti, aby spolu komunikovala?","Stejnou masku a stejné první bity IP adresy",["Stejnou MAC adresu","Stejnou celou IP adresu","Jiné brány"],"Jinak nekomunikují, i když jsou fyzicky propojená."],
["msk","Proč 10.10.10.5 s maskou 255.255.255.0 nekomunikuje přímo s 10.10.11.2?","Maska /24 určuje síť prvními 3 oktety a 10.10.10 ≠ 10.10.11 – jsou to různé sítě",["Protože 10.10.11.2 je veřejná adresa","Protože obě adresy jsou APIPA","Protože maska 255.255.255.0 zakazuje jakoukoli komunikaci"],"Pakety musí jít přes router (bránu)."],
["msk","Co je brána (gateway)?","Adresa routeru, přes který jdou všechny požadavky mimo „domácí“ síť",["Adresa DNS serveru, který překládá jména všech uzlů v domácí síti","MAC adresa switche, přes který jdou rámce mezi porty v jedné síti","Broadcast adresa sítě, na kterou se posílají pakety všem uzlům"],"Zvykem je jednička na konci, např. 10.30.0.1."],
["msk","Router má uvnitř 10.10.0.1/255.255.255.0, PC mají 10.10.0.100, .110, .120. Jak nastavíš další PC?","10.10.0.130, maska 255.255.255.0, brána 10.10.0.1",["10.10.1.130, maska 255.255.255.0, brána 10.10.0.1","10.10.0.120, maska 255.255.255.0, brána 10.10.0.1","10.10.0.130, maska 255.255.255.0, brána 85.25.69.11"],"Volná adresa ze stejné sítě, stejná maska, brána = vnitřní IP routeru."],
["msk","Patří při prefixu /26 adresy 192.168.1.130 a 192.168.1.190 do stejné podsítě?","Ano, obě leží v 192.168.1.128 – .191",["Ne, .130 leží v podsíti .128 – .159","Ne, .190 leží v podsíti .160 – .191","Ne, každá leží v jiné podsíti /26"],"Velikost /26 je 64 → podsítě .0, .64, .128, .192."],
["msk","Kolik podsítí /28 vznikne rozdělením sítě /24?","16",["8","14","32"],"4 půjčené bity → 2⁴ = 16."],
["msk","PC má 192.168.1.20/24 a bránu 192.168.2.1. V LAN komunikuje, ven ne. Proč?","Brána není ve stejné síti jako počítač",["Maska /24 neumožňuje komunikaci mimo síť","Adresa .20 je v síti /24 vyhrazená pro broadcast","Privátní adresa nemůže mít nastavenou bránu"],"Brána musí být adresa routeru z domácí sítě, tady 192.168.1.x."],
["msk","Spoj mezi dvěma routery potřebuje právě 2 použitelné adresy. Který prefix zvolíš?","/30",["/29","/28","/27"],"/30 = 4 adresy − síť − broadcast = 2."],
["msk","Kolik použitelných adres má podsíť /26?","62",["64","30","126"],"64 adres − adresa sítě − broadcast = 62."],
["msk","Do podsítě potřebuješ připojit 50 počítačů. Který nejmenší prefix stačí?","/26",["/27","/28","/25"],"/27 má jen 30 použitelných adres, /26 má 62."],
["msk","Jaká je broadcast adresa podsítě 192.168.1.64/26?","192.168.1.127",["192.168.1.63","192.168.1.128","192.168.1.191"],"Podsíť má 64 adres: .64 je síť, .127 poslední adresa = broadcast."],
["msk","Rozděluješ 192.168.1.0/24 na 4 podsítě. Jaká bude maska?","255.255.255.192 (/26)",["255.255.255.224 (/27)","255.255.255.128 (/25)","255.255.255.240 (/28)"],"4 podsítě = 2 půjčené bity (2² = 4) → /26."],
["msk","Rozděluješ síť /24 na 8 podsítí. Jaký bude prefix?","/27",["/26","/28","/25"],"8 = 2³ → 3 půjčené bity → /27."],
["msk","Co udělá každý „půjčený“ bit při subnettingu?","Zdvojnásobí počet podsítí a způlí jejich velikost",["Zdvojnásobí velikost podsítí","Přidá jednu podsíť","Nezmění nic, jen masku"],null],
["msk","Jaký je rozsah podsítě B při dělení 192.168.1.0/24 na 4 podsítě?","192.168.1.64 – 192.168.1.127",["192.168.1.63 – 192.168.1.127","192.168.1.65 – 192.168.1.128","192.168.1.0 – 192.168.1.63"],"Pozor – na slidu je překlep .63, správně .64."],
["msk","Do které /26 podsítě patří adresa 192.168.1.200?","192.168.1.192 – .255",["192.168.1.128 – .191","192.168.1.200 – .255","192.168.1.64 – .127"],null],
["msk","Jaká je adresa sítě pro 192.168.1.100/27?","192.168.1.96",["192.168.1.64","192.168.1.100","192.168.1.128"],"Velikost /27 = 32 → sítě 0, 32, 64, 96, 128… 100 leží v .96–.127."],
["msk","Rychlý trik: jak spočítáš velikost podsítě z masky?","256 − poslední oktet masky",["Poslední oktet masky × 2","256 / prefix","32 − prefix"],"Např. 256 − 192 = 64."],
["msk","Proč nejsou v podsíti použitelné dvě adresy?","První je adresa sítě a poslední broadcast",["Jsou rezervované pro DNS a DHCP","Jsou rezervované pro APIPA","Patří vždy routeru a switchi"],null],
["msk","Podle čeho DHCP server identifikuje zařízení, kterému přiděluje IP?","Podle MAC adresy",["Podle DNS jména","Podle čísla portu","Podle URL"],null],
["msk","Komu DHCP přiděluje IP dynamicky a komu staticky?","Dynamicky pracovním stanicím, staticky serverům a aktivním prvkům",["Dynamicky routerům, staticky stanicím","Všem jen staticky","Všem jen dynamicky"],"Ruční konfigurace má být jen výjimka."],

// ---------- DNS a URL (14) ----------
["dns","Jaké tři typy adres uzlu v síti existují (kromě MAC)?","IP, DNS, URL",["IP, MAC, port","DNS, URL, NAT","IPv4, IPv6, APIPA"],null],
["dns","Proč potřebujeme DNS?","TCP/IP jména „neumí“ – v paketu jsou jen IP adresy, DNS překládá jméno na IP",["Protože bez DNS nefunguje MAC adresace","Protože DNS přiděluje IP adresy","Protože DNS šifruje provoz"],null],
["dns","Je přístup přes DNS jméno rychlejší než přímo přes IP?","Ne, je vždy pomalejší (dotaz navíc) a může být méně spolehlivý",["Ano, je vždy rychlejší, protože DNS server si odpověď pamatuje","Je stejně rychlý, jméno se překládá až v cílovém počítači","Je rychlejší jen přes UDP, přes TCP je pomalejší než IP"],"Proto má každá oblast víc DNS serverů."],
["dns","Existuje vztah mezi čísly IP adresy a doménami?","Ne, žádný přímý vztah není",["Ano, každá doména odpovídá jednomu oktetu","Ano, první oktet určuje zemi","Ano, .cz má vždy IP začínající 193"],"193.84.45.240 = moodle.tf.czu.cz, ale čísla doménám neodpovídají."],
["dns","Kdo odkazuje na DNS server konkrétní domény?","DNS servery vyšších domén",["DHCP server","Router uživatele přes NAT","Switch podle MAC"],null],
["dns","Čím je nebezpečné napadené DNS?","Vrací jiné adresy a posílá uživatele na podvodné stránky",["Zpomalí kabeláž na 10 Mb/s a přeruší spojení s routerem","Vymaže MAC adresy ze switchů a síť přestane fungovat","Vypne DHCP server, takže zařízení dostanou APIPA adresy"],null],
["dns","Uživatel zadá www.tf.czu.cz. Co se musí stát, než počítač pošle paket na server?","DNS server přeloží jméno na IP adresu",["DHCP server přidělí cílovému serveru jméno","Switch převede doménové jméno na MAC adresu","Router přeloží doménové jméno pomocí NAT"],"V paketu jsou jen IP adresy, jména TCP/IP „neumí“."],
["dns","Web jde otevřít přes IP adresu, ale přes jeho doménové jméno ne. Kde je nejspíš problém?","V DNS – server je nedostupný nebo má neaktuální tabulku",["V kabeláži mezi počítačem a nejbližším switchem","V MAC adrese síťové karty uživatele","V masce sítě nastavené na cílovém serveru"],"Když funguje IP adresa, síť je v pořádku a selhává překlad jména."],
["dns","Co znamená zkratka URL?","Uniform Resource Locator",["Universal Routing Link","Unique Resource Line","Uniform Remote Login"],null],
["dns","Proč vznikla URL adresa?","Aby jeden počítač (jedna IP) mohl nabízet víc služeb",["Aby nahradila IP adresy v paketech","Aby šifrovala hesla","Aby přidělovala MAC adresy"],"Je nezbytná pro WWW – kvůli ní vznikla."],
["dns","Co umí URL navíc oproti DNS adrese?","Určit protokol (službu), jméno a heslo, port a cestu k souboru",["Nic navíc, je to jen jiný zápis stejné doménové adresy","Jen určit MAC adresu síťové karty cílového serveru","Jen zkrátit adresu a přeložit ji na IP bez DNS serveru"],null],
["dns","Jaký je správný tvar URL?","protokol://[jméno[:heslo]@]adresa_serveru[:port][cesta]",["adresa_serveru://protokol[:port]@jméno","[jméno@]protokol:adresa_serveru/port","protokol@adresa_serveru://[cesta][:heslo]"],null],
["dns","Co je v URL ftp://jan:tajne@Alpha.czu.cz:2121/index.htm číslo 2121?","Port",["Heslo","Cesta k souboru","Jméno uživatele"],"protokol://[jméno[:heslo]@]server[:port][cesta]"],
["dns","Která část adresy www.tf.czu.cz je doména nejvyšší úrovně?","cz",["www","tf","czu"],"Tvar: jméno_počítače.doména_i…doména_1 – nejvyšší je vpravo."],

// ---------- AKTIVNÍ / PASIVNÍ PRVKY (16) ----------
["prv","Jaký je rozdíl mezi pasivním a aktivním prvkem?","Pasivní jen přenáší paket, aktivní mění jeho chování při přenosu",["Aktivní jen přenáší paket, pasivní ho mění","Pasivní pracuje na 3. vrstvě, aktivní na 1.","Pasivní prvky jsou bezdrátové, aktivní kabelové"],null],
["prv","Který prvek je PASIVNÍ?","Patch panel",["Switch","Router","Hub"],"Pasivní: kabely, zásuvky, konektory, patch panely, rozvaděče."],
["prv","Který prvek je AKTIVNÍ?","Repeater",["Konektor","Zásuvka","Rozvaděč"],"Aktivní: hub, switch, router, repeater, media konvertor, firewall."],
["prv","Na které vrstvě OSI pracuje hub, switch a router?","Hub 1, switch 2, router 3",["Hub 2, switch 3, router 4","Hub 1, switch 3, router 2","Všechny na 3"],null],
["prv","Proč je switch bezpečnější než hub, když jde o odposlech provozu?","Hub posílá data všemi porty, switch jen na port adresáta",["Hub data šifruje, switch je posílá nešifrovaně","Switch posílá data všemi porty, hub jen adresátovi","Hub pracuje na 3. vrstvě, switch až na 7. vrstvě"],"U switche už médium není sdílené."],
["prv","Co dělá SWITCH s daty?","Pošle je jen na port adresáta (podle MAC)",["Pošle je všemi porty","Směruje je mezi sítěmi podle IP","Převede je na světlo"],"Médium není sdílené → vyšší výkon i bezpečnost."],
["prv","Co dělá ROUTER?","Spojuje alespoň dvě sítě a přenáší mezi nimi data",["Rozesílá signál všem portům","Jen zesiluje signál","Převádí analog na digitál"],"Základní prvek konektivity a bezpečnosti."],
["prv","Jaké zpoždění způsobuje hub?","Jen 1 bit – nižší latence než switch",["Celý rámec – vyšší latence než switch","Celý paket","Žádné zpoždění, 0 bitů"],null],
["prv","Kolik segmentů lze propojit huby u 10 Mbit/s a u 100 Mbit/s sítě?","10 Mbit/s: 5 segmentů (4 huby), 100 Mbit/s: 3 segmenty (2 huby)",["10 Mbit/s: 3 segmenty, 100 Mbit/s: 5 segmentů","Oba neomezeně","Oba max. 2 segmenty"],null],
["prv","Co umí managovatelný switch?","QoS, shaping, VLAN",["NAT a PAT","Převod signálu na světlo","Přidělovat veřejné IP"],null],
["prv","Co je „jednoruký“ router?","Router, který směruje mezi VLAN na jednom portu",["Router, který spojuje pouze dvě fyzické sítě","Router se dvěma porty pro dvě různé VLAN","Router pracující výhradně na 2. vrstvě OSI"],null],
["prv","Co dělá REPEATER?","Poškozený signál opraví, zesílí a pošle dál – prodlouží dosah",["Spojuje dvě různé sítě a vybírá cestu podle IP adresy","Překládá privátní adresy na jednu veřejnou adresu (NAT)","Filtruje provoz podle MAC a posílá rámce jen adresátovi"],"Pracuje na 1. (fyzické) vrstvě."],
["prv","Co je MODEM?","Media konvertor – převede signál z jednoho média na jiné (často analog na digitál)",["Prvek 3. vrstvy, který směruje pakety mezi různými sítěmi","Pasivní prvek pro uchycení a ochranu kabelů v rozvaděči","Server, který zařízením přiděluje IP adresy z rozsahu"],"Např. DSL modem: telefonní linka → UTP."],
["prv","Co je PowerLine (HomePlug)?","Přenos dat po rozvodech 230 V",["Přenos dat světlem","Přenos dat po optice","Napájení switche přes UTP"],"LiFi = UTP → světlo vzduchem."],
["prv","Chceš propojit síť 10.1.0.0/24 se sítí 10.2.0.0/24. Který prvek je nutný?","Router",["Hub","Switch","Repeater"],"Hub, switch a repeater pracují v rámci jedné LAN."],
["prv","Kdo směruje pakety v mobilních ad-hoc sítích?","Každý počítač routuje a forwarduje sám",["Jediný centrální router","Vždy switch","DNS server"],"V metalických a optických sítích je obvykle jeden router pro celou síť."],

// ---------- SWITCH/ROUTER SLUŽBY, NAT, PAT, FIREWALL (24) ----------
["nat","Switch dostane rámec pro MAC adresu, kterou ještě nezná. Co udělá?","Pošle ho všemi ostatními porty, chová se jako hub",["Rámec zahodí a ohlásí chybu odesílateli","Zeptá se DNS serveru, na kterém je portu","Předá ho routeru k překladu přes NAT"],"Backward Learning: port si zapamatuje podle prošlých rámců."],
["nat","Co dělá Backward Learning Algorithm?","Switch si pamatuje, na kterém portu je která MAC; neznámý cíl → chová se jako hub",["Router se z DNS dotazů učí, kterou cestou posílat pakety","Firewall se z historie provozu učí rozpoznat nové útoky","DHCP server si pamatuje, kterému zařízení dal jakou IP"],null],
["nat","Co řeší Spanning Tree Protocol (STP)?","Smyčky v síti – brání broadcast storm",["Překlad privátních adres na veřejné","Přidělování IP adres","Šifrování provozu"],"Switche se domluví a některé spoje nepoužívají. Nevýhoda: pomalé."],
["nat","Firma potřebuje hlubokou kontrolu obsahu a aplikací a cena nevadí. Který firewall vybere?","Firewall nové generace (NGFW)",["Firewall pro filtrování paketů","Obvodový firewall (circuit-level)","Stavový inspekční firewall"],"Ostatní tři obsah paketů neanalyzují."],
["nat","Co dělá routing?","Určuje cestu paketů podle routovacích tabulek",["Posílá data všem portům","Pamatuje si MAC na portech","Překládá jména na IP"],null],
["nat","Co je shaping (QoS)?","Omezení rychlosti klientů",["Šifrovaný kanál","Překlad portů","Řešení smyček"],null],
["nat","Co je VPN?","Šifrovaný kanál přes nezabezpečené médium",["Virtuální LAN vytvořená na switchi","Překlad privátních adres na veřejnou","Omezení rychlosti připojených klientů"],null],
["nat","Co NENÍ služba routeru podle přednášky?","Backward Learning Algorithm",["NAT a PAT","VPN","DHCP a DNS"],"Backward Learning je služba switche (2. vrstva)."],
["nat","Co je NAT?","Více zařízení s privátní adresou používá jednu veřejnou IP",["Přidělování IP adres podle MAC","Překlad jmen na IP","Řešení smyček ve switchích"],null],
["nat","Jak router při NAT pozná, komu uvnitř patří odpověď?","Překlad si uložil do tabulky pod náhodným portem a podle něj ho najde",["Podle MAC adresy serveru, ze kterého odpověď přišla","Nepozná to, a proto odpověď pošle všem vnitřním počítačům","Podle DNS jména, které si uložil při odchozím dotazu"],null],
["nat","Kdo musí při NAT zahájit komunikaci?","Vnitřní síť – zvenku se na počítač uvnitř spojit nejde",["Vnější server","Kdokoli, NAT to neomezuje","DNS server"],null],
["nat","Co dělá Destination NAT a kde se hlavně používá?","Mění cílovou IP/port, hlavně u veřejných WiFi hotspotů",["Mění zdrojovou IP v domácnostech","Mění MAC adresy na switchi","Šifruje provoz ve VPN"],"Source NAT mění zdrojovou IP."],
["nat","Co je maškaráda (1:N)?","Dynamický NAT – nejčastější, domácnosti a firmy",["Konkrétní vnitřní adresa má vyhrazenou veřejnou","NAT u poskytovatele","Statický překlad portů"],"NAT 1:1 = vnitřní adresa má vyhrazenou veřejnou."],
["nat","Web server na 192.168.0.50 za NAT routerem není zvenku dostupný. Co nastavíš?","PAT: předání portu na 192.168.0.50 se statickou IP",["DHCP: serveru se při startu přidělí nová adresa","STP: na switchi se zruší smyčky v síti LAN","DNS: jméno serveru se přeloží na adresu APIPA"],"Při NAT musí komunikaci zahájit vnitřní síť; PAT zpřístupní službu zvenku."],
["nat","Co je NEVÝHODOU NAT?","Těžko se blokují konkrétní vnitřní zařízení zvenku",["Šetří IPv4 adresy","Skrývá strukturu vnitřní sítě","Umožní více zařízením jednu IP"],"Další: zařízení nemají reálné spojení ven, problémy s SW, energetická náročnost."],
["nat","Je skrytí vnitřní sítě pomocí NAT zásadní zabezpečení?","Ne, není to zásadní zabezpečení",["Ano, nahrazuje firewall","Ano, ale jen u IPv6","Ano, je lepší než NGFW"],null],
["nat","Na kterých vrstvách pracují NAT a PAT?","NAT na 3., PAT na 3. a 4.",["NAT na 2., PAT na 3.","Oba jen na 7.","NAT na 4., PAT na 2."],"PAT je podmnožina NAT."],
["nat","Jak se podle přednášky liší NAT a PAT v práci s portem?","U NAT router port generuje náhodně, u PAT ho musí předem nastavit správce",["U NAT port nastavuje správce, u PAT je náhodný","Ani jeden porty nepoužívá","Oba porty jen náhodně generují"],null],
["nat","V PAT tabulce je 8080 → 192.168.0.101:8080. Kam router přepošle paket na 68.202.151.70:8080?","Na vnitřní server 192.168.0.101 (musí mít statickou IP)",["Zahodí ho","Na všechny vnitřní počítače","Zpět odesílateli"],"Nevýhoda PAT: nižší bezpečnost zpřístupněných zařízení, detailnější nastavení firewallu."],
["nat","Co je firewall?","Kontrolní bod s pravidly, který řídí provoz mezi sítěmi s různou důvěryhodností",["Switch s podporou VLAN, který odděluje porty v jedné síti","Server pro DNS, který blokuje překlad podezřelých domén","Pasivní prvek v rozvaděči, který chrání kabely před rušením"],"Historicky pravidla: zdrojová/cílová IP a port."],
["nat","Jak funguje firewall typu filtrování paketů?","Kontroluje pakety podle IP, portů a protokolů – neanalyzuje obsah",["Sleduje stav aktivních spojení","Analyzuje obsah na aplikační úrovni","Učí se pomocí AI"],"+ jednoduchý a rychlý."],
["nat","Jak funguje proxy firewall (aplikační brána)?","Je prostředník a analyzuje obsah na aplikační úrovni – zpomaluje provoz",["Kontroluje jen IP adresy a porty, obsah paketů neřeší","Učí se detekovat anomálie pomocí AI a reaguje na zero-day","Hlídá jen TCP handshake a relace, obsah neanalyzuje"],"Stavový inspekční sleduje stav spojení, obvodový hlídá TCP handshake."],
["nat","Co je NGFW?","Firewall nové generace – firewall + IDS/IPS a kontrola aplikací (drahý, složitý)",["Nejjednodušší filtr paketů podle IP adres a portů","Firewall jako služba hostovaná v cloudu (FWaaS)","Firewall pracující jen na 2. vrstvě podle MAC adres"],null],
["nat","Co je typické pro neuronový (AI) firewall?","Detekuje anomálie, učí se, reaguje i na zero-day; drahý, falešné poplachy",["Je nejlevnější a nejjednodušší, kontroluje jen IP a porty","Neanalyzuje obsah, hlídá jen TCP handshake a relace","Funguje jen v cloudu jako služba a nemá falešné poplachy"],"Pro střední firmu stovky tisíc až miliony Kč ročně. Doma stačí SW firewall."],

// ---------- KABELÁŽ (24) ----------
["kab","Co je nejčastějším zdrojem poruch v síti?","Kabely a konektory",["Routery","DNS servery","Operační systém"],"Proto se vyplatí kvalitní projekt (strukturovaná kabeláž)."],
["kab","S čím roste útlum kabelu?","S frekvencí, menším průměrem kabelu a délkou",["S větším průměrem kabelu","Jen s teplotou","S počtem připojených PC"],"Útlum určuje použitelnou délku kabelu."],
["kab","Jak se nazývá přeslech mezi souběžnými vodiči?","Crosstalk",["Jitter","Broadcast storm","Handshake"],null],
["kab","Co patří mezi ochranné pasivní prvky?","Rozvaděče (rack), záložní zdroje, ventilace, klimatizace",["Konektory RJ45, BNC a průchodky proti zlomu kabelu","Patch panely, zásuvky, lišty a spojky na kabely","Huby, repeatery a media konvertory v rozvaděči"],"Pomocné: spojky, rozdvojky, zásuvky, lišty, patch panely."],
["kab","Jak je stavěný koaxiální kabel?","Střední vodič, plastová izolace, opletení (stínění), vnější pouzdro",["4 zkroucené páry vodičů","Skleněné jádro a plášť","Dva paralelní dráty bez izolace"],null],
["kab","Tenký koax: standard, max. segment a konektor?","10BASE-2, 185 m, BNC",["10BASE-5, 500 m, AUI","10BASE-2, 500 m, RJ45","10BASE-T, 100 m, BNC"],"Tlustý: 10BASE-5, 500 m, AUI. Oba 10 Mb/s, 50 Ω, sběrnice."],
["kab","Tlustý koax („Yellow Ethernet“): standard a max. segment?","10BASE-5, 500 m",["10BASE-2, 185 m","10BASE-T, 100 m","10BASE-F, 2 km"],"Celá síť max 2 500 m (tenký 910 m)."],
["kab","Co patří na konce tenkého koaxu?","Terminátory",["Patch panely","Repeatery","RJ45 konektory"],"Potřeba: BNC, T-konektory, I-konektory (spojky), terminátory."],
["kab","Proč jsou T-konektory u tenkého koaxu problém?","Na každé odbočce se kabel přeruší, což způsobuje těžko zjistitelné poruchy",["Jsou příliš drahé, a proto se v sítích nepoužívají","Neumí přenést 10 Mb/s, takže síť zpomalují","Nefungují s BNC konektory a vyžadují AUI"],null],
["kab","Kolik párů má kroucená dvoulinka a proč jsou zkroucené?","4 páry; zkroucení potlačuje rušení a zvyšuje dosah",["2 páry; kvůli ohebnosti","8 párů; kvůli rychlosti","4 páry; kvůli nižší ceně"],"Každý pár má jinou délku zkrutu."],
["kab","Co znamená, že kroucená dvoulinka je symetrické vedení?","Obě žíly jsou rovnocenné a signál je rozdíl potenciálů mezi nimi",["Jedna žíla je zem, druhá signál","Kabel je stejně dlouhý na obou koncích","Oba konce mají stejný konektor"],null],
["kab","K čemu se používá lanko a k čemu drát?","Lanko na ohebné kabely k PC, drát na pevné rozvody v lištách",["Lanko do lišt, drát k PC","Oba jen na optiku","Lanko pro koax, drát pro UTP"],null],
["kab","Co znamená U/FTP?","Kabel nestíněný, páry stíněné fólií",["Kabel fólií, páry nestíněné","Kabel opletením, páry fólií","Nic není stíněné"],"Před lomítkem celý kabel, za lomítkem páry. U = nestíněný, F = fólie, S = opletení."],
["kab","Co znamená F/UTP?","Kabel stíněný fólií, páry nestíněné",["Kabel nestíněný, páry fólií","Kabel i páry fólií","Kabel opletením"],"Staré FTP = nové F/UTP; staré STP = nové U/FTP."],
["kab","Co znamená S/FTP?","Kabel stíněný opletením, páry fólií",["Kabel fólií, páry opletením","Nic nestíněné","Kabel fólií + opletením, páry nestíněné"],null],
["kab","Jakou rychlost a frekvenci má Cat.5e?","1 Gb/s, 100 MHz",["100 Mb/s, 100 MHz","10 Gb/s, 500 MHz","1 Gb/s, 250 MHz"],"Cat.5 = 100 Mb/s."],
["kab","Potřebuješ 10 Gb/s na 80 m s běžným RJ45 a doporučovanou kategorií. Co zvolíš?","Cat.6A",["Cat.5E","Cat.7","Cat.8"],"Cat.5E má 1 Gb/s, Cat.7 se nedoporučuje a má nestandardní konektory, Cat.8 má dosah jen 30 m."],
["kab","Jakou rychlost a max. délku mají Cat.8 a Cat.8a?","Cat.8 25 Gb/s, Cat.8a 40 Gb/s – obě jen 30 m",["Obě 40 Gb/s na 100 m","Cat.8 10 Gb/s, Cat.8a 15 Gb/s na 100 m","Obě 100 Gb/s na 10 m"],null],
["kab","Proč je Cat.6 „slepá kolej“?","Chybí limit pro Alien Crosstalk, výkonem odpovídá Cat.5E",["Je příliš drahá na výrobu a instalaci do lišt","Má maximální délku jen 30 m jako Cat.8","Nepoužívá konektor RJ45, ale nestandardní GG45"],"Alien Crosstalk = přeslech mezi sousedními kabely ve svazku a porty. 2006: Cat.6A (ISO/IEC 11801)."],
["kab","Jakou kabeláž přednáška doporučuje?","Běžně Cat.5E, pro náročné Cat.6A (případně Cat.8)",["Vždy Cat.6, protože je spolehlivější pro Gigabit než Cat.5E","Vždy Cat.7, protože má nejvyšší šířku pásma 600 MHz","Cat.3 pro domácnosti a Cat.6 pro firmy a páteřní sítě"],"Cat.6 a Cat.7 se nedoporučují. Výkon se dnes hodnotí přenosovou rychlostí, ne šířkou pásma."],
["kab","Kolik kontaktů má RJ45 a k čemu je RJ11?","RJ45 8 kontaktů; RJ11 telefon (6 kontaktů, 2 nevyužité)",["RJ45 4 kontakty; RJ11 data","RJ45 6 kontaktů; RJ11 optika","RJ45 10 kontaktů; RJ11 koax"],"RJ10 (4 kontakty) = sluchátko telefonu. Pro Cat.7 konektory GG45 a TERA."],
["kab","Zákazník potřebuje levnou kabeláž pro gigabitovou LAN. Co podle přednášky nabídnout?","Cat.5E – 1 Gb/s garantuje norma",["Cat.6 – vyšší šířka pásma je spolehlivější","Cat.7 – výkonem je nejlepší pro Gigabit","Cat.5 – pro Gigabit je certifikovaná"],"Argument o vyšší spolehlivosti Cat.6 je podle přednášky zavádějící."],
["kab","Propojuješ počítač se switchem. Jaký kabel použiješ?","Přímý – oba konce zapojené stejně",["Křížený – jeden konec T568A, druhý T568B","Koaxiální kabel s terminátory na koncích","Telefonní kabel s konektorem RJ11"],"Křížený se používá pro PC ↔ PC a switch ↔ switch."],
["kab","Co je křížený kabel a k čemu je?","Jeden konec T568A, druhý T568B – PC ↔ PC, switch ↔ switch",["Oba konce zapojené podle T568B – mezi PC a switchem","Kabel s BNC konektory a terminátory pro koaxiální síť","Kabel s jediným párem vodičů pro telefonní linku"],"Prohodí se zelený a oranžový pár. Přímý = oba konce stejně (B–B), PC ↔ switch."],

// ---------- OPTIKA (12) ----------
["opt","Co je optické vlákno a díky čemu v něm světlo drží?","Nevodivý vlnovod; úplný odraz na rozhraní dvou prostředí",["Měděný vodič; magnetické pole","Kroucený pár; stínění","Rádiová anténa; odraz od ionosféry"],"Snellův zákon lomu: při malém úhlu dopadu se paprsek odrazí celý."],
["opt","Jednovidové vlákno (SMF): průměr a zdroj světla?","9/125 μm (8,5/125), laser",["50/125 μm, LED","62,5/125 μm, LED","9/125 μm, LED"],"Jediný mód, minimální disperze, dlouhé dosahy, WDM."],
["opt","Mnohovidové vlákno (MMF): průměr a zdroj světla?","50/125 nebo 62,5/125 μm, LED nebo VCSEL 850 nm",["9/125 μm, výhradně laser pro dlouhé trasy","8,5/125 μm, laser a vlnový multiplex DWDM","125/250 μm, halogenová žárovka nebo výbojka"],"Levnější, kratší dosah – datacentra, kampus. 62,5/125 hlavně v USA."],
["opt","Jaký je klíčový parametr optiky a jakou má hodnotu u křemíku?","Útlum, kolem 0,2 dB/km",["Odpor, 50 Ω","Útlum, 50–100 dB/km","Frekvence, 100 MHz"],"Plastová vlákna 50–100 dB/km. Nad 1 700 nm se nepoužívají."],
["opt","Mezi dvěma městy vede trasa 40 km. Jaké vlákno a zdroj světla zvolíš?","Jednovidové (SMF) s laserem",["Mnohovidové (MMF) s LED diodou","Mnohovidové 62,5/125 μm s VCSEL","Plastové vlákno s LED diodou"],"MMF je ekonomická volba pro krátké linky, SMF má dlouhé dosahy."],
["opt","Proč se vždy pokládá víc optických vláken, než je potřeba?","Kabel (50–300 Kč/m) je levný proti pokládce a aktivním prvkům",["Protože vlákna se po pár letech přirozeně kazí","Protože to přímo vyžaduje norma ISO/IEC 11801","Protože každé vlákno přenese jen jednu službu"],null],
["opt","Co umožňuje vlnový multiplex (WDM/DWDM)?","Přenos víc „barev“ (vlnových délek) jedním vláknem",["Přenos elektřiny po vlákně","Převod světla na rádio","Šifrování dat"],null],
["opt","Jak se jmenují sloty pro optiku v routerech?","SFP",["RJ45","BNC","AUI"],null],
["opt","Kde roste význam optiky?","V páteřních sítích MAN a WAN",["V lokálních sítích LAN","V připojení domácích PC","V rozvodech uvnitř kanceláří"],"V LAN význam klesá kvůli bezdrátu."],
["opt","Proč se plastová vlákna nehodí na dlouhé trasy?","Mají útlum 50–100 dB/km, křemík jen kolem 0,2 dB/km",["Mají útlum kolem 0,2 dB/km, křemík 50–100 dB/km","Neumí přenášet světlo z LED diod ani z laseru","Jsou citlivá na elektromagnetické rušení z okolí"],null],
["opt","Co NENÍ výhodou optiky?","Levné konvertory",["Obrovská šířka pásma","Odolnost proti EM rušení a elektrická izolace","Bezpečnost přenosu (státní správa, banky)"],null],
["opt","Co je potřeba k přenosu po optice kromě vlákna?","Vysílač se zdrojem světla a detektor s přijímačem",["Jen konektor RJ45 a obyčejný switch v síti","Anténa s přímou viditelností a licence od ČTU","BNC konektory a terminátory na obou koncích"],null],

// ---------- BEZDRÁT (17) ----------
["wif","Jaké jsou vlastnosti bezdrátových přenosů?","Postaví se rychle a na velké vzdálenosti, ale jsou méně spolehlivé a méně bezpečné",["Jsou spolehlivější i bezpečnější než kabelové rozvody","Dají se postavit jen na krátké vzdálenosti uvnitř budov","Vždy vyžadují licenci od ČTU a nízké investice"],null],
["wif","Jaký frekvenční rozsah má rádiová a jaký mikrovlnná komunikace?","Rádiová 30 Hz – 1 GHz, mikrovlnná 1 – ~100 GHz",["Rádiová 1–100 GHz, mikrovlnná 30 Hz – 1 GHz","Obě 2,4 GHz","Rádiová nad 100 GHz, mikrovlnná pod 1 MHz"],null],
["wif","Jak se šíří mikrovlny?","Přímočaře, směrové antény, potřeba přímé viditelnosti (retranslační stanice)",["Všesměrově a dobře procházejí překážkami","Jen po kabelu","Odrazem od ionosféry"],"Použití: WiFi, 5G, GSM, satelity. Rádio: AM/FM, vysílačky, IoT."],
["wif","Co platí o nelicencovaném pásmu (WiFi)?","Nevyžaduje povolení ČTU, je zdarma, ale kanál ti nikdo nezaručí",["Přiděluje ho ČTU a garantuje ochranu","Je placené a chráněné","Nesmí ho používat domácnosti"],"Rušení omezí směrové antény (pozor na Fresnelovu zónu)."],
["wif","Proč má 2,4 GHz problém se stromy a dřevem?","Vlnu (~12,5 cm) z 95 % pohltí voda a organické látky",["Protože je moc krátká (~1 mm)","Protože ji odráží kov","Protože vyžaduje licenci"],"5 GHz: vlna ~6 cm, voda ji pohlcuje méně."],
["wif","Co platí o pásmu 6 GHz?","Nové pásmo (5,925–7,125 GHz), kanály se nepřekrývají – nezaměňovat s WiFi 6",["Je to totéž co obchodní označení WiFi 6 (802.11ax)","Používá se jen pro rozhlasové vysílání AM/FM","Je licencované a přiděluje ho ČTU konkrétním firmám"],null],
["wif","Co platí o pásmu 10 GHz?","Jen spoje bod–bod, až 34 Mb/s, dosah až 40 km",["Všesměrová WiFi pro domácnosti","Jen sítě s centrálním uzlem a klienty","Bod–bod, až 622 Mb/s, dosah 5 km"],null],
["wif","Jaká je reálná přenosová rychlost WiFi proti nominální?","Podle vzorkovacího teorému minimálně poloviční",["Vždy dvojnásobná díky kompresi dat v routeru","Přesně stejná, pokud není v dosahu jiná síť","Desetinová kvůli rušení od sousedních sítí"],null],
["wif","Jaký standard je WiFi 6 a WiFi 7?","WiFi 6 = 802.11ax, WiFi 7 = 802.11be",["WiFi 6 = 802.11ac, WiFi 7 = 802.11ax","WiFi 6 = 802.11be, WiFi 7 = 802.11ax","WiFi 6 = 802.11n, WiFi 7 = 802.11ac"],"WiFi 5 = 802.11ac, WiFi 6E = 802.11ax + 6 GHz."],
["wif","Co přinesla WiFi 7?","Kanál 320 MHz, 4096 QAM, MLO, Multi-RU, puncturing",["Povinných 40 MHz a 256 QAM","Jen pásmo 2,4 GHz","WPA2 a 64 QAM"],"Až 46 120 Mb/s, rok 2024, ~13× rychlejší než WiFi 5."],
["wif","Jaké zabezpečení a modulaci má WiFi 6?","WPA3, 1024 QAM",["WPA2, 256 QAM","WPA4, 4096 QAM","WEP, 64 QAM"],"Novinky WiFi 6: TWT, BSS coloring, beamforming."],
["wif","Co je WiFi MESH?","Víc bezdrátově propojených prvků, které se tváří jako jeden router (jedna síť, název, heslo)",["Síť bez hesla, ke které se může připojit kdokoli","Kabelová síť propojená huby do hvězdy","Licencovaný bodový spoj, který přiděluje ČTU"],"Klient se připojí na prvek s nejlepším signálem."],
["wif","Jaká je základní bezpečnostní zásada u WiFi?","Změnit výchozí nastavení zařízení",["Nechat tovární heslo","Vypnout šifrování","Používat jen 2,4 GHz"],"Připojit se může kdokoli odkudkoli."],
["wif","Co platí o licencovaném pásmu?","Přiděluje ČTU, frekvence je chráněná; až 622 Mb/s, dosah ~50 km",["Je zdarma bez povolení","Kapacita klesá s počtem klientů jako u WiFi","Dosah max 100 m"],"Pásma 3,5 GHz a 7,5–38 GHz. Kapacitu nesnižuje počet klientů ani malé pakety."],
["wif","Co je FSO a jaký je jeho největší nepřítel?","Laser/LED vzduchem bod–bod do ~5 km; hustá mlha",["WiFi v pásmu 6 GHz; největší nepřítel je déšť","Optické vlákno v zemi; největší nepřítel je ohyb","Rádiový spoj ČTU; největší nepřítel je sníh"],"Déšť ani sníh nevadí. Řeší se rádiovou zálohou → dostupnost 99,999 %."],
["wif","Dvě budovy 1 km od sebe mají přímou viditelnost, v lokalitě bývá hustá mlha. Co zvolíš?","FSO s automatickou rádiovou zálohou",["Samotné FSO, protože mlha mu nevadí","Tenký koax 10BASE-2 mezi budovami","WiFi MESH bez přímé viditelnosti"],"Mlha je největší nepřítel FSO; s rádiovou zálohou dostupnost 99,999 %."],
["wif","Co je VLC a co LiFi?","VLC = data ve viditelném světle z LED (simplex); LiFi = LED bliká tak rychle, že to oko nevidí",["VLC je standard WiFi 7; LiFi je označení sítě 5G","VLC je optické vlákno; LiFi je typ koaxiálního kabelu","Obě jsou licencovaná rádiová pásma, která přiděluje ČTU"],"LiFi: bez EM rušení, nízká spotřeba, bezpečná komunikace."],
],

  learn: `
    <div class="lc" id="L-zak" style="--c:#60a5fa"><h2>1 · Základní pojmy</h2><ul>
      <li><b>Síť</b> = propojení uzlů (nodes / stanice), technicky: <b>přenosové médium + NIC</b> + další komponenty</li>
      <li>Funkční PC = HW + OS · <b>funkční síť = HW + komunikační protokol</b></li>
      <li>Princip přenosu: <b>PAKETY</b> (neucpat síť) · <b>ADRESY</b> (jednoznačné) · univerzální <b>PROTOKOL</b></li>
      <li>Požadavky: množství, rychlost, spolehlivost, univerzálnost · Limity: rychlost média, různorodost, množství služeb, bezpečnost</li>
      <li><b>Protokol</b> = předpis (SW), hierarchické vrstvy, nezávislý na implementaci. Funkce: detekce zařízení, atributy, začátek/konec paketu, formát, detekce+oprava chyb, ukončení</li>
      <li><b>IPX/SPX</b>: Novell, <b>MAC</b> adresy, rychlý, cesta známá, jen LAN · <b>TCP/IP</b>: <b>IP</b> adresy, univerzální, hledá trasu, „rodina protokolů“</li>
      <li><b>Přenosový</b> protokol (IP, IPX) přenese data · <b>aplikační</b> (HTTP, DNS…) je předá aplikaci</li>
      <li>Kriminalita: od <b>2006</b> nejlukrativnější · k síti není potřeba „oprávnění“</li></ul></div>

    <div class="lc" id="L-osi" style="--c:#a78bfa"><h2>2 · OSI vs TCP/IP, TCP vs UDP</h2>
      <table class="lt"><tr><th>Vrstva OSI</th><th>Co dělá</th><th>Prvek</th><th>TCP/IP</th></tr>
      <tr><td>7&nbsp;Aplikační<small>data</small></td><td>služby pro aplikace</td><td></td><td rowspan="3">Aplikační</td></tr>
      <tr><td>6&nbsp;Prezentační<small>data</small></td><td>formát, kódování, šifrování</td><td></td></tr>
      <tr><td>5&nbsp;Relační<small>data</small></td><td>řízení relace</td><td></td></tr>
      <tr><td>4&nbsp;Transportní<small>segment</small></td><td>doručení, řízení toku, <b>porty</b></td><td>TCP, UDP</td><td>Transportní</td></tr>
      <tr><td>3&nbsp;Síťová<small>paket</small></td><td><b>IP</b>, směrování</td><td><b>router</b></td><td>Síťová</td></tr>
      <tr><td>2&nbsp;Linková<small>rámec</small></td><td><b>MAC</b>, rámce, CRC</td><td><b>switch</b>, NIC</td><td rowspan="2">Síťové rozhraní</td></tr>
      <tr><td>1&nbsp;Fyzická<small>bity</small></td><td>signál, médium</td><td><b>hub</b>, repeater</td></tr></table>
      <ul><li>Síťová vrstva: IP, ARP, RARP, ICMP, IGMP, IGRP, IPSEC – <b>ve všech prvcích</b> · Transportní – <b>jen v koncových</b> zařízeních</li>
      <li><b>TCP</b> = spojovaný, spolehlivý, pořadí, potvrzuje, po částech → WWW, e-mail, SSH</li>
      <li><b>UDP</b> = bez spojení, ztráta/přehození/duplicita, celý blok v 1 datagramu → DNS, DHCP, VoIP, hry</li>
      <li>Spojení = <b>IP + port + transportní protokol</b> · DNS používá TCP i UDP</li></ul></div>

    <div class="lc" id="L-pro" style="--c:#f472b6"><h2>3 · Aplikační protokoly</h2>
      <div class="grid2">
      <div><b>DNS</b> jména → IP</div><div><b>DHCP</b> přidělení IP</div>
      <div><b>HTTP</b> WWW</div><div><b>FTP / TFTP</b> soubory / jednoduše</div>
      <div><b>SMTP</b> odeslání pošty</div><div><b>POP3</b> stažení · <b>IMAP</b> na serveru</div>
      <div><b>Telnet</b> terminál · <b>SSH</b> zabezpečený</div><div><b>SNMP</b> správa zařízení</div>
      <div><b>NTP</b> čas</div><div><b>SMB</b> Windows · <b>NFS</b> Unix</div>
      <div><b>NTLM</b> ověření Windows</div><div><b>XMPP</b> Jabber · <b>IRC</b> chat</div>
      <div><b>NNTP</b> news · <b>X11</b> okna Unix</div><div><b>WebDAV</b> soubory přes HTTP</div></div></div>

    <div class="lc" id="L-adr" style="--c:#34d399"><h2>4 · Adresace</h2>
      <table class="lt"><tr><th></th><th>MAC</th><th>IPv4</th><th>IPv6</th></tr>
      <tr><td>Typ</td><td>fyzická (karta)</td><td>logická</td><td>logická</td></tr>
      <tr><td>Bitů</td><td><b>48</b></td><td><b>32</b></td><td><b>128</b></td></tr>
      <tr><td>Počet</td><td>≈2,8×10¹⁴</td><td>≈4×10⁹</td><td>≈3×10³⁸</td></tr>
      <tr><td>Zápis</td><td>A0-48-1C-92-DB-CF</td><td>192.168.0.1</td><td>8× 4 hexa</td></tr></table>
      <ul><li>Pravidlo: <b>nikdy dva uzly se stejnou adresou</b> · rozhraní může mít víc IP, stejná IP ne na víc rozhraních</li>
      <li>MAC dnes: přeskok mezi sousedy, identifikace pro DHCP, filtrování/firewall, ověření (WiFi)</li>
      <li>Proti nedostatku IPv4 (jen zmírňují): <b>DHCP</b>, <b>subnetting/CIDR</b>, <b>NAT/PAT</b> → řešení IPv6</li>
      <li class="hl">Privátní: <b>10.0.0.0–10.255.255.255</b> · <b>172.16.0.0–172.31.255.255</b> · <b>192.168.0.0–192.168.255.255</b></li>
      <li>Veřejná IP → dostupná z Internetu, nutný firewall · privátní → za <b>NAT routerem</b></li>
      <li>Privátní odesílatel na veřejné síti → <b>zahozen</b> · ven jde přes <b>bránu (NAT)</b> · mimo masku → ignorováno</li>
      <li><b>APIPA 169.254.x.x</b> (třída B) – když nepřijde DHCP; jen lokálně, DHCP hledá <b>každé 3 min</b></li>
      <li>Proč IP, když MAC má víc kombinací? <b>MAC není hierarchická</b> → nejde podle ní směrovat</li></ul></div>

    <div class="lc" id="L-msk" style="--c:#fbbf24"><h2>5 · Maska, brána, subnetting, DHCP</h2><ul>
      <li>Parametry: <b>IP, maska, brána, DHCP, DNS</b></li>
      <li>Maska 32 b: <b>1 = síť, 0 = počítač</b> · stejná síť = stejná maska + stejné první bity</li>
      <li>10.10.10.x/24 ≠ 10.10.<b>11</b>.x → jiná síť → přes <b>router</b></li>
      <li><b>Brána</b> = router ven, stejná pro celou síť, zvykem <b>.1</b></li>
      <li>Každý půjčený bit: <b>2× víc podsítí, ½ velikost</b> · velikost = <b>256 − poslední oktet</b> · použitelné = velikost − 2</li></ul>
      <table class="lt"><tr><th>Prefix</th><th>Maska</th><th>Adres</th><th>Použit.</th><th>Podsítí z /24</th></tr>
      <tr><td>/24</td><td>.0</td><td>256</td><td>254</td><td>1</td></tr><tr><td>/25</td><td>.128</td><td>128</td><td>126</td><td>2</td></tr>
      <tr><td>/26</td><td>.192</td><td>64</td><td>62</td><td>4</td></tr><tr><td>/27</td><td>.224</td><td>32</td><td>30</td><td>8</td></tr>
      <tr><td>/28</td><td>.240</td><td>16</td><td>14</td><td>16</td></tr><tr><td>/29</td><td>.248</td><td>8</td><td>6</td><td>32</td></tr>
      <tr><td>/30</td><td>.252</td><td>4</td><td>2</td><td>64</td></tr></table>
      <ul><li>192.168.1.0/24 na 4: <b>/26</b> → .0–63 · .64–127 · .128–191 · .192–255</li>
      <li><b>DHCP</b> pozná zařízení podle <b>MAC</b> · dynamicky = stanice · staticky = servery, routery, switche · ručně jen výjimečně</li></ul></div>

    <div class="lc" id="L-dns" style="--c:#22d3ee"><h2>6 · DNS a URL</h2><ul>
      <li>Typy adres: <b>IP, DNS, URL</b> (+ MAC) · DNS: jméno.doména…doména₁ (TLD vpravo)</li>
      <li>TCP/IP jména „neumí“ → <b>DNS server</b> překládá jméno ↔ IP; odkazují na něj servery vyšších domén</li>
      <li>Přes DNS vždy <b>pomalejší</b>, může být méně spolehlivé → víc DNS serverů</li>
      <li>Čísla IP <b>neodpovídají</b> doménám · napadené DNS → podvodné stránky</li>
      <li>Bezpečné DNS: <b>1.1.1.1 / 1.0.0.1</b> Cloudflare · <b>8.8.8.8 / 8.8.4.4</b> Google · EU <b>86.54.11.1/.201</b> (reklamy .13/.213, děti .11/.211)</li>
      <li><b>URL</b> = víc služeb na 1 PC; umí server + protokol + jméno/heslo + port + cesta; vznikla kvůli <b>WWW</b></li>
      <li class="hl"><code>protokol://[jméno[:heslo]@]server[:port][cesta]</code></li></ul></div>

    <div class="lc" id="L-prv" style="--c:#fb923c"><h2>7 · Aktivní a pasivní prvky</h2><ul>
      <li><b>Pasivní</b> jen přenáší (kabely, zásuvky, patch panely, rozvaděče) · <b>aktivní</b> mění chování paketu</li></ul>
      <table class="lt"><tr><th>Prvek</th><th>OSI</th><th>Klíčové</th></tr>
      <tr><td><b>HUB</b></td><td>1</td><td>posílá <b>všem</b>, zpoždění 1 bit; 10 Mb: 5 segm. (4 huby), 100 Mb: 3 segm. (2 huby)</td></tr>
      <tr><td><b>SWITCH</b></td><td>2</td><td>jen adresátovi podle <b>MAC</b>, nesdílené médium; managed: QoS, VLAN</td></tr>
      <tr><td><b>ROUTER</b></td><td>3</td><td>spojuje <b>≥ 2 sítě</b> podle IP; „jednoruký“ = VLAN na 1 portu</td></tr>
      <tr><td><b>REPEATER</b></td><td>1</td><td>opraví, zesílí → delší dosah</td></tr>
      <tr><td>MODEM</td><td>–</td><td>media konvertor, analog → digitál (DSL)</td></tr>
      <tr><td>WiFi / LiFi / PowerLine</td><td>–</td><td>UTP → rádio (2,4/5/10/60 GHz) / světlo / rozvody 230 V</td></tr></table>
      <ul><li>Hub, switch, repeater, WiFi = <b>v rámci LAN</b> · router = <b>propojení sítí</b> · ad-hoc sítě: každý PC routuje sám</li></ul></div>

    <div class="lc" id="L-nat" style="--c:#f87171"><h2>8 · Služby: switch, router, NAT, PAT, firewall</h2><ul>
      <li>Služby dnes spíš na <b>síťových prvcích</b> (router, switch, AP, NAS)</li>
      <li><b>Switch (L2)</b>: <b>Backward Learning</b> (MAC↔port, neznámý cíl = jako hub) · <b>STP</b> (smyčky, brání broadcast storm, pomalé) · management, VLAN, SNMP</li>
      <li><b>Router (L3)</b>: routing (tabulky), DNS, DHCP, management, <b>shaping/QoS</b>, <b>VPN</b> (šifrovaný kanál), NAT, PAT, firewall</li>
      <li><b>NAT</b>: víc privátních → <b>1 veřejná IP</b>, překlad pod <b>náhodným portem</b>; komunikaci musí zahájit <b>vnitřní síť</b></li>
      <li>Typy: Source (zdroj. IP) · Destination (cíl, hotspoty) · <b>Maškaráda 1:N</b> (nejčastější) · 1:1 · <b>CGNAT/NAT444 100.64.0.0/10</b></li>
      <li>+ šetří IPv4, skrývá síť (není zásadní zabezpečení!) · − nelze zvenku dovnitř, problém se SW, energie</li>
      <li><b>PAT</b> = podmnožina NAT, <b>L3+L4</b> (NAT jen L3); port <b>nastaví správce</b> (8080 → 192.168.0.101:8080), server se <b>statickou IP</b></li>
      <li><b>Firewall</b> = kontrolní bod mezi sítěmi různé důvěryhodnosti</li></ul>
      <table class="lt"><tr><th>Typ</th><th>Jak</th><th>+ / −</th></tr>
      <tr><td>Filtrování paketů</td><td>IP, porty, protokoly</td><td>rychlý / neanalyzuje obsah</td></tr>
      <tr><td>Stavový</td><td>stav spojení</td><td>kontext / náročnější</td></tr>
      <tr><td>Proxy</td><td>obsah na aplikační úrovni</td><td>hloubka / zpomaluje</td></tr>
      <tr><td>NGFW</td><td>+ IDS/IPS, aplikace</td><td>komplexní / drahý</td></tr>
      <tr><td>Obvodový</td><td>TCP handshake</td><td>rychlý / neanalyzuje obsah</td></tr>
      <tr><td>Neuronový AI</td><td>anomálie, zero-day</td><td>proaktivní / drahý, fals. poplachy</td></tr>
      <tr><td>Cloud FWaaS</td><td>služba v cloudu</td><td>levný start / závislost, poplatky</td></tr></table>
      <ul><li>Bezpečnostní politika = pravidla + NAT, VPN, <b>IDS</b>, autentizace, šířka pásma · doma SW firewall, firma HW</li></ul></div>

    <div class="lc" id="L-kab" style="--c:#a3e635"><h2>9 · Kabeláž</h2><ul>
      <li><b>Kabely a konektory = nejčastější zdroj poruch</b> · útlum roste s frekvencí, menším průměrem, délkou · přeslech = crosstalk</li>
      <li>Koax 10 Mb/s · dvoulinka 1 Gb/s+, <b>100 m</b> · optika ~10 Gb/s+, km, drahé konvertory</li></ul>
      <table class="lt"><tr><th></th><th>Tenký koax</th><th>Tlustý koax</th></tr>
      <tr><td>Standard</td><td><b>10BASE-2</b> (RG-58)</td><td><b>10BASE-5</b> („Yellow“)</td></tr>
      <tr><td>Segment / síť</td><td><b>185 m</b> / 910 m</td><td><b>500 m</b> / 2 500 m</td></tr>
      <tr><td>Konektor</td><td><b>BNC</b> + T, I, terminátory</td><td><b>AUI</b></td></tr></table>
      <ul><li>Oba 50 Ω, sběrnice, 10 Mb/s · T-konektory = těžko zjistitelné poruchy · zásuvka EAD</li>
      <li>Dvoulinka: <b>4 páry</b>, různá délka zkrutu, <b>symetrické vedení</b> · lanko → k PC, drát → lišty</li>
      <li>Značení <b>X/YTP</b>: před lomítkem kabel, za lomítkem páry · U nestíněný, F fólie, S opletení · STP = U/FTP, FTP = F/UTP</li></ul>
      <table class="lt"><tr><th>Cat</th><th>Rychlost</th><th>MHz</th><th>Délka</th></tr>
      <tr><td>5</td><td>100 Mb/s</td><td>100</td><td>100 m</td></tr><tr class="g"><td>5e ✓</td><td>1 Gb/s</td><td>100</td><td>100 m</td></tr>
      <tr class="r"><td>6 ✗</td><td>1 Gb/s</td><td>250</td><td>100 m</td></tr><tr class="g"><td>6a ✓</td><td>10 Gb/s</td><td>500–625</td><td>100 m</td></tr>
      <tr class="r"><td>7 ✗</td><td>10 Gb/s</td><td>600</td><td>100 m</td></tr><tr><td>7a</td><td>15 Gb/s</td><td>1000</td><td>100 m</td></tr>
      <tr><td>8</td><td>25 Gb/s</td><td>2000</td><td><b>30 m</b></td></tr><tr><td>8a</td><td>40 Gb/s</td><td>2000</td><td><b>30 m</b></td></tr></table>
      <ul><li>Cat.6/7 slepá kolej: chybí limit <b>Alien Crosstalk</b> (přeslech mezi kabely ve svazku) → 2006 Cat.6A · hodnotí se <b>přenosová rychlost</b></li>
      <li>RJ45 = 8 kontaktů · RJ11 telefon (6, 2 nevyuž.) · RJ10 sluchátko (4) · Cat.7: GG45, TERA</li>
      <li>Lisování: konektor <b>pojistkou od sebe</b>, krimpovací kleště, průchodka</li>
      <li class="hl">T568B: <span class="pin w o">b-oranž</span> <span class="pin o">oranž</span> <span class="pin w g">b-zel</span> <span class="pin b">modrá</span> <span class="pin w b">b-modrá</span> <span class="pin g">zelená</span> <span class="pin w h">b-hnědá</span> <span class="pin h">hnědá</span> · T568A = prohozená zelená ↔ oranžová</li>
      <li><b>Přímý</b> (B–B): PC ↔ switch · <b>Křížený</b> (A–B): PC ↔ PC, switch ↔ switch</li></ul></div>

    <div class="lc" id="L-opt" style="--c:#38bdf8"><h2>10 · Optika</h2><ul>
      <li><b>Nevodivý vlnovod</b>, světlo drží <b>úplný odraz</b> (Snellův zákon)</li>
      <li><b>SMF</b> 9/125 μm, 1 mód, <b>laser</b>, dlouhé trasy, WDM · <b>MMF</b> 50 nebo 62,5/125 μm, <b>LED/VCSEL 850 nm</b>, krátké linky</li>
      <li>Klíč = <b>útlum</b>: křemík ~<b>0,2 dB/km</b>, plast 50–100 dB/km, nad 1 700 nm ne</li>
      <li>Okna: O 1260–1310 · E 1360–1460 · S 1460–1530 · <b>C 1530–1562</b> · L 1560–1625 · U &gt;1625 nm</li>
      <li>Kabel 50–300 Kč/m → <b>pokládat víc vláken</b> · WDM/DWDM = víc „barev“ · slot <b>SFP</b></li>
      <li>Význam roste v <b>MAN/WAN</b>, v LAN klesá · ~11 Tb/s DWDM na 80 km · ~900 km s EDFA</li>
      <li>+ šířka pásma, nízký útlum, EM odolnost, izolace, bezpečnost (banky), malé rozměry · − drahé konvertory</li></ul></div>

    <div class="lc" id="L-wif" style="--c:#c084fc"><h2>11 · Bezdrát</h2><ul>
      <li>Rychle a daleko, ale <b>méně spolehlivé a bezpečné</b></li>
      <li>Rádio <b>30 Hz–1 GHz</b> (všesměr., AM/FM, IoT) · Mikrovlny <b>1–100 GHz</b> (přímá viditelnost, WiFi, 5G, GSM, satelity)</li>
      <li><b>Nelicencované</b> (WiFi): bez ČTU, zdarma, nechráněné → směrové antény (Fresnelova zóna)</li>
      <li>2,4 GHz vlna 12,5 cm (95 % pohltí voda) · 5 GHz 6 cm · <b>6 GHz ≠ WiFi 6</b> · 10 GHz bod–bod 34 Mb/s 40 km</li>
      <li>Reálná rychlost <b>min. poloviční</b> (vzorkovací teorém)</li></ul>
      <table class="lt"><tr><th></th><th>WiFi 5</th><th>WiFi 6 / 6E</th><th>WiFi 7</th></tr>
      <tr><td>Std.</td><td>802.11ac</td><td>802.11ax</td><td>802.11be</td></tr>
      <tr><td>Pásma</td><td>5</td><td>2,4+5 (/+6)</td><td>2,4+5+6</td></tr>
      <tr><td>Max</td><td>6 933 Mb/s</td><td>9 608 Mb/s</td><td>46 120 Mb/s</td></tr>
      <tr><td>Kanál</td><td>160</td><td>160</td><td>320 MHz</td></tr>
      <tr><td>QAM</td><td>256</td><td>1024</td><td>4096</td></tr>
      <tr><td>Zabezp.</td><td>WPA2</td><td>WPA3</td><td>WPA4</td></tr>
      <tr><td>Novinka</td><td>40 MHz</td><td>TWT, BSS col., beamf.</td><td>MLO, Multi-RU, punct.</td></tr>
      <tr><td>Rok</td><td>2014</td><td>2019 / 2020</td><td>2024</td></tr></table>
      <ul><li><b>MESH</b> = víc prvků jako 1 router (1 síť, název, heslo) · bezpečnost: <b>změnit výchozí nastavení</b></li>
      <li><b>Licencované</b>: ČTU, chráněné, až 622 Mb/s, ~50 km, 3,5 a 7,5–38 GHz, nezávisí na počtu klientů</li>
      <li><b>FSO</b>: laser/LED bod–bod ≤5 km, ≤1 250 Mb/s, bez licence, úzký svazek · nepřítel <b>hustá mlha</b> (déšť/sníh ne) → rádiová záloha <b>99,999 %</b> · RONJA · photophone 1880</li>
      <li><b>VLC</b> = viditelné světlo LED, simplex · <b>LiFi</b> = rychle blikající LED, bez EM rušení</li></ul></div>
`,
});
