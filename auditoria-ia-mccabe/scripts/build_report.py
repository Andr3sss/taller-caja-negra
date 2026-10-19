from pathlib import Path
import re, html, json
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, Preformatted, KeepTogether
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.enums import TA_JUSTIFY
from reportlab.graphics.shapes import Drawing, Line, Polygon, Rect, String
from reportlab.graphics import renderSVG
ROOT=Path(__file__).resolve().parent.parent
for name,file in [('Body','DejaVuSans.ttf'),('Bold','DejaVuSans-Bold.ttf'),('Code','DejaVuSansMono.ttf')]:
 pdfmetrics.registerFont(TTFont(name,'/usr/share/fonts/truetype/dejavu/'+file))
pdfmetrics.registerFontFamily('Body',normal='Body',bold='Bold',italic='Body',boldItalic='Bold')
NAVY=colors.HexColor('#102840');INK=colors.HexColor('#18344e');MUTED=colors.HexColor('#52677a');LINE=colors.HexColor('#dbe4ec');WASH=colors.HexColor('#f4f7fa')
styles={
 'body':ParagraphStyle('body',fontName='Body',fontSize=10,leading=15,textColor=INK,spaceAfter=10,alignment=TA_JUSTIFY),
 'h2':ParagraphStyle('h2',fontName='Bold',fontSize=19,leading=24,textColor=NAVY,spaceBefore=18,spaceAfter=13,keepWithNext=True),
 'small':ParagraphStyle('small',fontName='Body',fontSize=8,leading=11.5,textColor=MUTED,spaceAfter=8),
 'cell':ParagraphStyle('cell',fontName='Body',fontSize=7.8,leading=11,textColor=INK),
 'cellhead':ParagraphStyle('cellhead',fontName='Bold',fontSize=7.8,leading=11,textColor=colors.white),
 'code':ParagraphStyle('code',fontName='Code',fontSize=8.2,leading=12,textColor=NAVY,backColor=WASH,borderPadding=12,spaceBefore=5,spaceAfter=15)
}
def p(text,style='body'):
 text=html.escape(text)
 text=re.sub(r'`([^`]+)`',r'<font name="Code">\1</font>',text)
 text=re.sub(r'\*\*([^*]+)\*\*',r'<b>\1</b>',text)
 return Paragraph(text,styles[style])
def graph():
 d=Drawing(490,410)
 def arrow(points,label=None,lpos=None):
  for a,b in zip(points,points[1:]):d.add(Line(*a,*b,strokeColor=MUTED,strokeWidth=1.4))
  a,b=points[-2:];dx=b[0]-a[0];dy=b[1]-a[1];length=(dx*dx+dy*dy)**.5;ux,uy=dx/length,dy/length
  d.add(Polygon([b[0],b[1],b[0]-8*ux+3*uy,b[1]-8*uy-3*ux,b[0]-8*ux-3*uy,b[1]-8*uy+3*ux],fillColor=MUTED,strokeColor=MUTED))
  if label:d.add(String(*lpos,label,fontName='Body',fontSize=9,fillColor=INK))
 def box(x,y,w,label,navy=False):
  d.add(Rect(x-w/2,y-16,w,32,rx=6,fillColor=NAVY if navy else WASH,strokeColor=NAVY,strokeWidth=1))
  d.add(String(x,y-3,label,textAnchor='middle',fontName='Body',fontSize=9,fillColor=colors.white if navy else INK))
 def diamond(x,y,w,label):
  d.add(Polygon([x,y+28,x+w/2,y,x,y-28,x-w/2,y],fillColor=WASH,strokeColor=NAVY,strokeWidth=1))
  d.add(String(x,y-3,label,textAnchor='middle',fontName='Body',fontSize=9,fillColor=INK))
 arrow([(245,364),(245,343)])
 arrow([(245,287),(245,253)],'T',(254,268))
 arrow([(180,315),(90,315),(90,141)],'F',(127,325))
 arrow([(165,225),(150,225),(150,125),(140,125)],'F',(156,182))
 arrow([(325,225),(350,225),(350,141)],'T',(361,182))
 arrow([(90,109),(90,70),(245,70),(245,46)])
 arrow([(350,109),(350,70),(245,70),(245,46)])
 box(245,380,104,'N1 · Entrada',True);diamond(245,315,130,'N2 · late?');diamond(245,225,160,'N3 · !emergency?')
 box(90,125,100,'N5 · return 0');box(350,125,130,'N4 · return 1000');box(245,30,104,'N6 · Salida',True)
 return d
renderSVG.drawToFile(graph(),str(ROOT/'docs/penalty-cfg.svg'))

def footer(c,doc):
 c.saveState();w,h=doc.pagesize
 if doc.page>1:
  c.setStrokeColor(LINE);c.line(48,h-39,w-48,h-39);c.setFont('Body',8);c.setFillColor(MUTED);c.drawString(48,h-28,'Andrés Quisilema  /  Pruebas de caja blanca')
 c.setStrokeColor(LINE);c.line(48,40,w-48,40);c.setFont('Body',8);c.setFillColor(MUTED);c.drawString(48,26,'UIDE · 19 de octubre de 2026');c.drawRightString(w-48,26,str(doc.page));c.restoreState()

story=[]
story.append(Spacer(1,105))
story.append(Paragraph('Auditoría de IA<br/>con McCabe<br/>y cobertura',ParagraphStyle('cover',fontName='Bold',fontSize=37,leading=46,textColor=NAVY,spaceAfter=28)))
story.append(Paragraph('Sistema de citas de medicina familiar',ParagraphStyle('subtitle',fontName='Body',fontSize=17,leading=24,textColor=MUTED,spaceAfter=26)))
story.append(Paragraph('Desarrollo del taller · Pruebas de caja blanca',styles['body']))
story.append(Spacer(1,86))
story.append(Paragraph('Andrés Quisilema',ParagraphStyle('author',fontName='Bold',fontSize=15,leading=22,textColor=NAVY,spaceAfter=8)))
story.append(Paragraph('Universidad Internacional del Ecuador<br/>Ingeniería en Sistemas de la Información<br/>19 de octubre de 2026',styles['body']))
story.append(Spacer(1,30));story.append(p('Código ejecutable, grafo de control, tres caminos independientes, cobertura, oráculos y mutaciones.','small'));story.append(PageBreak())
text=(ROOT/'docs/INFORME.md').read_text()
sections=re.split(r'^## ',text,flags=re.M)[1:]
page_before={'Paso 1. Cálculo manual de la penalización','Paso 3. Re-prompting del auditor','Fronteras, integración y mutaciones','Control humano y criterio de refactorización','Diseño, límites y reproducción'}
for sec in sections:
 title,body=sec.split('\n',1)
 if title in page_before:story.append(PageBreak())
 story.append(p(title,'h2'))
 if title.startswith('Paso 1'):
  story.append(p('CFG de la expresión por cortocircuito. Cada arista representa una transferencia de control; T y F indican verdadero y falso.','small'))
  d=graph();d.width=490;d.height=410;d.scale(.83,.83);d.width*=.83;d.height*=.83
  story.append(d)
 lines=body.strip().splitlines();i=0
 while i<len(lines):
  line=lines[i].strip()
  if not line:i+=1;continue
  if line.startswith('```'):
   code=[];i+=1
   while i<len(lines) and not lines[i].startswith('```'):code.append(lines[i]);i+=1
   story.append(Preformatted('\n'.join(code),styles['code']));i+=1;continue
  if line.startswith('|'):
   rows=[]
   while i<len(lines) and lines[i].strip().startswith('|'):
    vals=[v.strip() for v in lines[i].strip().strip('|').split('|')]
    if not all(re.match(r'^:?-+:?$',v) for v in vals):rows.append(vals)
    i+=1
   count=len(rows[0]); widths={3:[110,227,162],4:[48,245,103,103],5:[44,57,67,209,122]}.get(count,[499/count]*count)
   if title=='Paso 1. Cálculo manual de la penalización':widths=[54,75,85,165,120]
   data=[[p(cell,'cellhead' if r==0 else 'cell') for cell in row] for r,row in enumerate(rows)]
   t=Table(data,colWidths=widths,repeatRows=1,hAlign='LEFT');t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),NAVY),('ROWBACKGROUNDS',(0,1),(-1,-1),[colors.white,WASH]),('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),9),('RIGHTPADDING',(0,0),(-1,-1),9),('TOPPADDING',(0,0),(-1,-1),9),('BOTTOMPADDING',(0,0),(-1,-1),9),('LINEBELOW',(0,-1),(-1,-1),.5,LINE)]));story.extend([t,Spacer(1,14)]);continue
  paragraph=[line];i+=1
  while i<len(lines) and lines[i].strip() and not lines[i].startswith(('|','```')):paragraph.append(lines[i].strip());i+=1
  story.append(p(' '.join(paragraph)))

doc=SimpleDocTemplate(str(ROOT/'Informe_Auditoria_McCabe.pdf'),pagesize=(595.28,841.89),leftMargin=48,rightMargin=48,topMargin=57,bottomMargin=57,title='Auditoría de IA con McCabe y cobertura',author='Andrés Quisilema')
doc.build(story,onFirstPage=footer,onLaterPages=footer)
print(ROOT/'Informe_Auditoria_McCabe.pdf')
