import functions_framework

@functions_framework.http
def hello_python(request):
    name = request.args.get('name', 'Cloud Engineer')
    return f"Hello {name}, this is the Python 3 backend responding!", 200
