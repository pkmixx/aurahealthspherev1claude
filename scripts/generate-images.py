import os, sys, io, concurrent.futures as cf
from google import genai
from google.genai import types
from PIL import Image
# Generates site photography with Gemini into src/assets/photos.
# Requires: pip install google-genai pillow ; env GEMINI_API_KEY with available credits.
# Usage: python scripts/generate-images.py            (all images)
#        python scripts/generate-images.py mind fitness (specific images)
# Images are picked up automatically by src/config/images.ts — no code changes needed.
import pathlib
ROOT=pathlib.Path(__file__).resolve().parent.parent
DEST=str(ROOT/'src'/'assets'/'photos'); OUT=str(ROOT/'scripts'/'.generated-originals')
os.makedirs(DEST,exist_ok=True); os.makedirs(OUT,exist_ok=True)
STYLE=("Editorial documentary photograph, realistic, natural light, shot on a full-frame camera with a 35mm lens, "
 "candid and unposed, authentic modern India context, clean uncluttered composition, calm premium mood, "
 "slightly cool colour grade with soft blue tones, gentle shallow depth of field, realistic skin texture. "
 "No text, no logos, no watermarks, no signage, no brand names.")
P={
'doctor-consultation':"A doctor in a white coat speaking with a patient across a tidy desk in a bright, modern clinic consultation room. Shot over the patient's shoulder, the patient softly out of focus in the foreground, the doctor mid-conversation, gesturing gently. Warm, reassuring atmosphere.",
'pharmacy':"Close-up of a pharmacist's hands arranging neatly labelled plain medicine boxes on clean white shelves in a modern, well-lit pharmacy. Face not visible.",
'lab-tests':"Close-up of a laboratory technician's gloved hands placing capped sample tubes into a rack on a clean white bench in a modern diagnostic lab, soft blue ambient light. No blood visible, no needles.",
'health-camps':"Wide candid shot of a workplace health camp set up in a bright modern office space: a nurse measuring the blood pressure of a seated office employee at a small table, other colleagues waiting in the background.",
'diet-nutrition':"Overhead flat-lay of a balanced, colourful Indian meal on a light stone surface: dal, millet roti, green salad, sprouts, curd and cut fruit in ceramic bowls, with a small notebook and pen at the edge.",
'corporate':"Wide candid shot of a small group of office colleagues doing a gentle seated stretch together at their desks in a modern glass-walled office, led by an instructor, relaxed smiles, daylight.",
'about-vision':"A woman meditating cross-legged on a mat beside a large window at sunrise, seen from the side and slightly behind, soft golden and blue light, plants in the room, serene minimal interior.",
'individuals':"A person on an early morning walk along a tree-lined path in a green urban park in India, seen from mid-distance, soft morning haze, calm and healthy lifestyle mood.",
'organisations':"View from the back of a bright modern meeting room: a facilitator presenting a wellness workshop to a small attentive group of office employees seated in a semicircle, whiteboard with blank pages.",
'mind':"Close-up of hands gently striking a brass singing bowl with a wooden mallet during a sound therapy session, soft candle light, blurred background of people resting on mats.",
'fitness':"Candid shot of a group dance fitness class in a bright studio, participants mid-movement, slight motion blur, energetic yet elegant, mixed ages.",
'prevention':"An optometrist checking an office employee's eyes with a handheld device during an on-site eye check-up camp in a modern office, candid, side angle.",
'awareness':"A CPR training session in an office: participants kneeling on the floor practising chest compressions on training manikins while the trainer observes, candid wide shot, daylight.",
}
client=genai.Client()
def gen(k):
    err=None
    for attempt in range(3):
        try:
            r=client.models.generate_content(model='gemini-3-pro-image',contents=P[k]+" "+STYLE,
              config=types.GenerateContentConfig(response_modalities=['IMAGE'],image_config=types.ImageConfig(aspect_ratio='3:2')))
            for part in r.candidates[0].content.parts:
                if part.inline_data:
                    im=Image.open(io.BytesIO(part.inline_data.data)).convert('RGB')
                    im.save(f'{OUT}/{k}.png')
                    for w in (640,1200):
                        im.resize((w,round(im.height*w/im.width)),Image.LANCZOS).save(f'{DEST}/{k}-{w}.webp',quality=80)
                    return f'{k} ok {im.size}'
        except Exception as e:
            err=e
            if '402' in str(e) or 'RESOURCE_EXHAUSTED' in str(e): break
            err='no image returned'
    return f'{k} FAILED {err}'
keys=sys.argv[1:] or list(P)
with cf.ThreadPoolExecutor(4) as ex:
    for res in ex.map(gen,keys): print(res,flush=True)
