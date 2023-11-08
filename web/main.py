import eel

eel.init('web')

@eel.expose  # Add this decorator to expose the function

def get_text_in_python():
    return "https://www.youtube.com/watch?v=yoKxxL1wk0A"

eel.start('index.html')
