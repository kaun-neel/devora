export const languages = [
  { id: 'python', name: 'Python', icon: 'devicon-python-plain', color: 'bg-yellow-400', textColor: 'text-black', snippets: [
    { title: 'FastAPI Boilerplate', desc: 'Stand up a modern API endpoint.', author: 'dev_ninja99', trending: true, code: 'from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get("/")\ndef read_root():\n    return {"Hello": "World"}' },
    { title: 'Async HTTPX', desc: 'Concurrent HTTP requests.', author: 'python_guru', trending: false, code: 'import httpx\nimport asyncio\n\nasync def fetch(url):\n    async with httpx.AsyncClient() as client:\n        res = await client.get(url)\n        return res.json()' },
    { title: 'Data Class', desc: 'Modern python object structure.', author: 'class_master', trending: false, code: 'from dataclasses import dataclass\n\n@dataclass\nclass Point:\n    x: float\n    y: float\n    z: float = 0.0' },
    { title: 'Read JSON File', desc: 'Standard JSON parsing.', author: 'data_worm', trending: false, code: 'import json\n\nwith open("data.json", "r") as f:\n    data = json.load(f)\nprint(data)' },
    { title: 'SQLAlchemy Setup', desc: 'Database engine configuration.', author: 'db_admin', trending: false, code: 'from sqlalchemy import create_engine\nfrom sqlalchemy.orm import sessionmaker\n\nengine = create_engine("sqlite:///mydb.db")\nSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)' },
    { title: 'Regex Match', desc: 'Find all occurrences of a pattern.', author: 'regex_god', trending: false, code: 'import re\n\ntext = "My email is test@example.com"\nmatches = re.findall(r"[\\w\\.-]+@[\\w\\.-]+", text)\nprint(matches)' },
    { title: 'Multiprocessing Pool', desc: 'Parallelize CPU bound tasks.', author: 'cpu_burner', trending: false, code: 'from multiprocessing import Pool\n\ndef f(x):\n    return x*x\n\nif __name__ == "__main__":\n    with Pool(5) as p:\n        print(p.map(f, [1, 2, 3]))' },
    { title: 'Decorator Pattern', desc: 'Wrapper for timing functions.', author: 'clean_coder', trending: false, code: 'import time\n\ndef timer(func):\n    def wrapper(*args, **kwargs):\n        start = time.time()\n        result = func(*args, **kwargs)\n        print(f"Time: {time.time()-start}")\n        return result\n    return wrapper' }
  ]},
  { id: 'javascript', name: 'JavaScript', icon: 'devicon-javascript-plain', color: 'bg-[#f7df1e]', textColor: 'text-black', snippets: [
    { title: 'Fetch Wrapper', desc: 'Robust wrapper around fetch.', author: 'js_wizard', trending: true, code: 'async function fetchIt(url) {\n  const res = await fetch(url);\n  if (!res.ok) throw new Error("Err");\n  return res.json();\n}' },
    { title: 'Debounce', desc: 'Limit function execution rate.', author: 'frontend_bob', trending: false, code: 'function debounce(fn, wait) {\n  let t;\n  return (...args) => {\n    clearTimeout(t);\n    t = setTimeout(() => fn(...args), wait);\n  };\n}' },
    { title: 'Deep Clone', desc: 'Clone object without reference.', author: 'clone_trooper', trending: false, code: 'const deepClone = (obj) => JSON.parse(JSON.stringify(obj));' },
    { title: 'Throttle', desc: 'Limit function execution frequency.', author: 'speed_racer', trending: false, code: 'function throttle(func, limit) {\n  let inThrottle;\n  return function() {\n    const args = arguments;\n    const context = this;\n    if (!inThrottle) {\n      func.apply(context, args);\n      inThrottle = true;\n      setTimeout(() => inThrottle = false, limit);\n    }\n  }\n}' },
    { title: 'UUID Generator', desc: 'Generate unique identifier.', author: 'id_maker', trending: false, code: 'function uuidv4() {\n  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>\n    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)\n  );\n}' },
    { title: 'Capitalize Words', desc: 'Capitalize first letter of words.', author: 'text_smith', trending: false, code: 'const capitalize = str => str.replace(/\\b\\w/g, c => c.toUpperCase());' },
    { title: 'Sleep Promise', desc: 'Pause execution for ms.', author: 'time_lord', trending: false, code: 'const sleep = ms => new Promise(r => setTimeout(r, ms));' },
    { title: 'Get URL Params', desc: 'Extract query string parameters.', author: 'url_hacker', trending: false, code: 'const getParams = url => Object.fromEntries(new URL(url).searchParams);' }
  ]},
  { id: 'react', name: 'React', icon: 'devicon-react-original', color: 'bg-[#61dafb]', textColor: 'text-black', snippets: [
    { title: 'useAuth Hook', desc: 'React context auth hook.', author: 'react_master', trending: true, code: 'import { useContext } from "react";\nimport { AuthContext } from "./AuthContext";\n\nexport const useAuth = () => useContext(AuthContext);' },
    { title: 'ErrorBoundary', desc: 'Catch render errors.', author: 'ui_dev22', trending: false, code: 'class ErrorBoundary extends React.Component {\n  state = { hasError: false };\n  static getDerivedStateFromError() { return { hasError: true }; }\n  render() { return this.state.hasError ? <h1>Error</h1> : this.props.children; }\n}' },
    { title: 'useLocalStorage', desc: 'Sync state to localStorage.', author: 'state_king', trending: false, code: 'function useLocalStorage(key, initial) {\n  const [val, setVal] = useState(() => {\n    const item = window.localStorage.getItem(key);\n    return item ? JSON.parse(item) : initial;\n  });\n  return [val, setVal];\n}' },
    { title: 'Memoized Component', desc: 'Prevent unnecessary re-renders.', author: 'perf_nerd', trending: false, code: 'import { memo } from "react";\n\nconst ListItem = memo(({ item }) => {\n  return <li>{item.name}</li>;\n});' },
    { title: 'useDebounce Hook', desc: 'Debounce input values.', author: 'hook_monster', trending: false, code: 'function useDebounce(value, delay) {\n  const [debounced, setDebounced] = useState(value);\n  useEffect(() => {\n    const handler = setTimeout(() => setDebounced(value), delay);\n    return () => clearTimeout(handler);\n  }, [value, delay]);\n  return debounced;\n}' },
    { title: 'Portal Modal', desc: 'Render component outside hierarchy.', author: 'modal_man', trending: false, code: 'import { createPortal } from "react-dom";\n\nconst Modal = ({ children }) => {\n  return createPortal(children, document.getElementById("modal-root"));\n};' },
    { title: 'Context Provider', desc: 'Global state provider shell.', author: 'provider_pro', trending: false, code: 'export const AppContext = createContext();\n\nexport const AppProvider = ({ children }) => {\n  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;\n};' },
    { title: 'useEffect Cleanup', desc: 'Event listener with cleanup.', author: 'clean_freak', trending: false, code: 'useEffect(() => {\n  const handleResize = () => setWidth(window.innerWidth);\n  window.addEventListener("resize", handleResize);\n  return () => window.removeEventListener("resize", handleResize);\n}, []);' }
  ]},
  { id: 'sql', name: 'SQL', icon: 'devicon-postgresql-plain', color: 'bg-blue-500', textColor: 'text-white', snippets: [
    { title: 'Upsert (Postgres)', desc: 'Insert or update record.', author: 'data_lord', trending: true, code: 'INSERT INTO users (id, name)\nVALUES (1, \'Alice\')\nON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;' },
    { title: 'Window Function', desc: 'Get latest record per group.', author: 'query_king', trending: false, code: 'SELECT *\nFROM (\n  SELECT *, ROW_NUMBER() OVER(PARTITION BY user_id ORDER BY created_at DESC) as rn\n  FROM sessions\n) t\nWHERE t.rn = 1;' },
    { title: 'CTE Hierarchy', desc: 'Recursive CTE for trees.', author: 'tree_hugger', trending: false, code: 'WITH RECURSIVE subordinates AS (\n  SELECT emp_id, manager_id FROM employees WHERE manager_id = 1\n  UNION\n  SELECT e.emp_id, e.manager_id FROM employees e\n  INNER JOIN subordinates s ON s.emp_id = e.manager_id\n)\nSELECT * FROM subordinates;' },
    { title: 'JSON Extract', desc: 'Extract data from JSON column.', author: 'json_jedi', trending: false, code: 'SELECT data->>\'email\' as email \nFROM users \nWHERE data->>\'role\' = \'admin\';' },
    { title: 'Find Duplicates', desc: 'Identify duplicate rows.', author: 'cleaner', trending: false, code: 'SELECT email, COUNT(*)\nFROM users\nGROUP BY email\nHAVING COUNT(*) > 1;' },
    { title: 'Delete Duplicates', desc: 'Remove duplicate rows keeping latest.', author: 'deleter', trending: false, code: 'DELETE FROM users\nWHERE id NOT IN (\n  SELECT MAX(id) FROM users GROUP BY email\n);' },
    { title: 'Rolling Average', desc: 'Calculate moving average.', author: 'stat_nerd', trending: false, code: 'SELECT date, sales,\nAVG(sales) OVER(ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) as moving_avg\nFROM daily_sales;' },
    { title: 'Full Outer Join', desc: 'Combine records from both tables.', author: 'joiner', trending: false, code: 'SELECT a.id, b.id\nFROM table_a a\nFULL OUTER JOIN table_b b ON a.id = b.id;' }
  ]},
  { id: 'java', name: 'Java', icon: 'devicon-java-plain', color: 'bg-[#f89820]', textColor: 'text-black', snippets: [
    { title: 'Spring Boot Main', desc: 'Basic Spring Boot application class.', author: 'java_architect', trending: true, code: '@SpringBootApplication\npublic class Application {\n    public static void main(String[] args) {\n        SpringApplication.run(Application.class, args);\n    }\n}' },
    { title: 'Singleton Pattern', desc: 'Thread-safe singleton.', author: 'oop_fanatic', trending: false, code: 'public class Singleton {\n    private static volatile Singleton instance;\n    private Singleton() {}\n    public static Singleton getInstance() {\n        if (instance == null) {\n            synchronized(Singleton.class) {\n                if (instance == null) instance = new Singleton();\n            }\n        }\n        return instance;\n    }\n}' },
    { title: 'Read File NIO', desc: 'Read file using NIO 2.', author: 'io_master', trending: false, code: 'import java.nio.file.*;\nimport java.io.IOException;\n\nString content = Files.readString(Paths.get("file.txt"));' },
    { title: 'Streams Filter', desc: 'Filter collection using Streams.', author: 'stream_rider', trending: false, code: 'List<String> active = users.stream()\n    .filter(User::isActive)\n    .map(User::getName)\n    .collect(Collectors.toList());' },
    { title: 'JDBC Connection', desc: 'Standard JDBC boilerplate.', author: 'jdbc_veteran', trending: false, code: 'try (Connection conn = DriverManager.getConnection(url, user, pass)) {\n    PreparedStatement ps = conn.prepareStatement("SELECT * FROM users");\n    ResultSet rs = ps.executeQuery();\n}' },
    { title: 'Optional Handling', desc: 'Avoid NullPointerException.', author: 'safe_coder', trending: false, code: 'Optional<User> user = userRepository.findById(id);\nString name = user.map(User::getName).orElse("Unknown");' },
    { title: 'CompletableFuture', desc: 'Async execution wrapper.', author: 'async_guy', trending: false, code: 'CompletableFuture.supplyAsync(() -> {\n    return performHeavyTask();\n}).thenAccept(result -> {\n    System.out.println(result);\n});' },
    { title: 'Regex Matcher', desc: 'Compile and match regex.', author: 'regex_ninja', trending: false, code: 'Pattern pattern = Pattern.compile("^[A-Z]+$");\nMatcher matcher = pattern.matcher("TEXT");\nboolean match = matcher.matches();' }
  ]},
  { id: 'c', name: 'C', icon: 'devicon-c-plain', color: 'bg-[#a8b9cc]', textColor: 'text-black', snippets: [
    { title: 'Read File', desc: 'Read file contents into buffer.', author: 'c_hacker', trending: true, code: 'FILE *f = fopen("file.txt", "rb");\nfseek(f, 0, SEEK_END);\nlong fsize = ftell(f);\nfseek(f, 0, SEEK_SET);\nchar *string = malloc(fsize + 1);\nfread(string, fsize, 1, f);\nfclose(f);\nstring[fsize] = 0;' },
    { title: 'Linked List Node', desc: 'Basic list structure.', author: 'pointer_pro', trending: false, code: 'typedef struct Node {\n    int data;\n    struct Node* next;\n} Node;' },
    { title: 'String Copy', desc: 'Safe string copying.', author: 'safe_c', trending: false, code: 'void safe_copy(char *dest, const char *src, size_t n) {\n    strncpy(dest, src, n - 1);\n    dest[n - 1] = \\\'\\0\\\';\n}' },
    { title: 'Macro Swap', desc: 'Swap variables without temp.', author: 'macro_wizard', trending: false, code: '#define SWAP(a, b) do { a ^= b; b ^= a; a ^= b; } while ( 0 )' },
    { title: 'Function Pointer', desc: 'Callback structure.', author: 'callback_fan', trending: false, code: 'void execute(void (*callback)(int)) {\n    callback(42);\n}' },
    { title: 'Memory Set', desc: 'Zero out memory.', author: 'mem_lord', trending: false, code: 'memset(buffer, 0, sizeof(buffer));' },
    { title: 'TCP Socket Client', desc: 'Basic socket setup.', author: 'net_hacker', trending: false, code: 'int sock = socket(AF_INET, SOCK_STREAM, 0);\nconnect(sock, (struct sockaddr *)&serv_addr, sizeof(serv_addr));' },
    { title: 'CLI Args Parsing', desc: 'Parse argc and argv.', author: 'cli_builder', trending: false, code: 'for(int i = 1; i < argc; i++) {\n    printf("Arg %d: %s\\n", i, argv[i]);\n}' }
  ]},
  { id: 'cpp', name: 'C++', icon: 'devicon-cplusplus-plain', color: 'bg-[#00599c]', textColor: 'text-white', snippets: [
    { title: 'Vector Iteration', desc: 'Modern C++ range-based loop.', author: 'cpp_coder', trending: true, code: 'std::vector<int> v = {1, 2, 3};\nfor (const auto& i : v) {\n    std::cout << i << "\\n";\n}' },
    { title: 'Smart Pointer', desc: 'Unique pointer usage.', author: 'memory_safe', trending: false, code: 'std::unique_ptr<MyClass> ptr = std::make_unique<MyClass>();' },
    { title: 'Template Function', desc: 'Generic programming.', author: 'template_guru', trending: false, code: 'template <typename T>\nT add(T a, T b) {\n    return a + b;\n}' },
    { title: 'Lambda Function', desc: 'Inline anonymous function.', author: 'modern_cpp', trending: false, code: 'auto add = [](int a, int b) { return a + b; };' },
    { title: 'Read File to String', desc: 'Using stringstream.', author: 'io_cpp', trending: false, code: 'std::ifstream file("file.txt");\nstd::stringstream buffer;\nbuffer << file.rdbuf();\nstd::string s = buffer.str();' },
    { title: 'Mutex Lock', desc: 'Thread-safe lock guard.', author: 'thread_master', trending: false, code: 'std::mutex mtx;\nstd::lock_guard<std::mutex> lock(mtx);' },
    { title: 'Map Lookup', desc: 'Check if key exists.', author: 'stl_fan', trending: false, code: 'if (myMap.find(key) != myMap.end()) {\n    // Found\n}' },
    { title: 'Custom Exception', desc: 'Inherit from std::exception.', author: 'error_handler', trending: false, code: 'class MyException : public std::exception {\n    virtual const char* what() const throw() {\n        return "My Error";\n    }\n};' }
  ]},
  { id: 'csharp', name: 'C#', icon: 'devicon-csharp-plain', color: 'bg-[#178600]', textColor: 'text-white', snippets: [
    { title: 'LINQ Query', desc: 'Filter and select data.', author: 'dotnet_dev', trending: true, code: 'var results = users\n    .Where(u => u.Age > 18)\n    .Select(u => u.Name)\n    .ToList();' },
    { title: 'Async Await Task', desc: 'Asynchronous method structure.', author: 'task_master', trending: false, code: 'public async Task<string> FetchDataAsync() {\n    await Task.Delay(1000);\n    return "Done";\n}' },
    { title: 'JSON Serialize', desc: 'Using System.Text.Json.', author: 'json_csharp', trending: false, code: 'string json = JsonSerializer.Serialize(user);\nUser parsed = JsonSerializer.Deserialize<User>(json);' },
    { title: 'Dependency Injection', desc: 'Registering service.', author: 'di_fan', trending: false, code: 'services.AddTransient<IMyService, MyService>();' },
    { title: 'Extension Method', desc: 'Adding methods to existing types.', author: 'ext_wizard', trending: false, code: 'public static class StringExt {\n    public static bool IsValid(this string s) => !string.IsNullOrEmpty(s);\n}' },
    { title: 'Read File', desc: 'Read all text simply.', author: 'file_reader', trending: false, code: 'string text = await File.ReadAllTextAsync("file.txt");' },
    { title: 'Pattern Matching', desc: 'Switch expression C# 8+.', author: 'pattern_guy', trending: false, code: 'var state = (a, b) switch {\n    (1, 1) => "Both One",\n    (_, _) => "Other"\n};' },
    { title: 'Record Type', desc: 'Immutable data object.', author: 'record_lover', trending: false, code: 'public record Person(string FirstName, string LastName);' }
  ]},
  { id: 'dotnet', name: '.NET', icon: 'devicon-dotnetcore-plain', color: 'bg-[#512bd4]', textColor: 'text-white', snippets: [
    { title: 'Minimal API', desc: 'ASP.NET Core Minimal API.', author: 'api_builder', trending: true, code: 'var builder = WebApplication.CreateBuilder(args);\nvar app = builder.Build();\napp.MapGet("/", () => "Hello World!");\napp.Run();' },
    { title: 'Entity Framework Context', desc: 'Db context definition.', author: 'ef_core', trending: false, code: 'public class AppContext : DbContext {\n    public DbSet<User> Users { get; set; }\n}' },
    { title: 'JWT Authentication', desc: 'Setup JWT in config.', author: 'auth_master', trending: false, code: 'builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)\n    .AddJwtBearer(options => { /* config */ });' },
    { title: 'Background Service', desc: 'Hosted worker service.', author: 'worker_bee', trending: false, code: 'public class MyWorker : BackgroundService {\n    protected override async Task ExecuteAsync(CancellationToken token) { }\n}' },
    { title: 'HttpClient Factory', desc: 'Register typed client.', author: 'http_guy', trending: false, code: 'builder.Services.AddHttpClient<MyClient>();' },
    { title: 'Middleware Pipeline', desc: 'Custom middleware structure.', author: 'middle_man', trending: false, code: 'app.Use(async (context, next) => {\n    await next();\n});' },
    { title: 'Configuration Read', desc: 'Read from appsettings.json.', author: 'config_reader', trending: false, code: 'var val = builder.Configuration.GetValue<string>("MyKey");' },
    { title: 'SignalR Hub', desc: 'Real-time websocket hub.', author: 'real_time', trending: false, code: 'public class ChatHub : Hub {\n    public async Task Send(string msg) => await Clients.All.SendAsync("Recv", msg);\n}' }
  ]},
  { id: 'django', name: 'Django', icon: 'devicon-django-plain', color: 'bg-[#092e20]', textColor: 'text-white', snippets: [
    { title: 'Model Definition', desc: 'Basic Django model.', author: 'django_pro', trending: true, code: 'from django.db import models\n\nclass Post(models.Model):\n    title = models.CharField(max_length=200)\n    content = models.TextField()\n    created_at = models.DateTimeField(auto_now_add=True)' },
    { title: 'Function View', desc: 'Simple HTTP response view.', author: 'view_master', trending: false, code: 'from django.http import HttpResponse\n\ndef my_view(request):\n    return HttpResponse("Hello")' },
    { title: 'CBV Template', desc: 'Class-based template view.', author: 'cbv_fan', trending: false, code: 'from django.views.generic import TemplateView\n\nclass HomeView(TemplateView):\n    template_name = "home.html"' },
    { title: 'QuerySet Filter', desc: 'Filtering database records.', author: 'orm_god', trending: false, code: 'active_users = User.objects.filter(is_active=True).order_by("-joined")' },
    { title: 'Form Definition', desc: 'Basic Django form.', author: 'form_builder', trending: false, code: 'from django import forms\n\nclass ContactForm(forms.Form):\n    email = forms.EmailField()' },
    { title: 'Admin Registration', desc: 'Register model in admin panel.', author: 'admin_panel', trending: false, code: 'from django.contrib import admin\nfrom .models import Post\n\nadmin.site.register(Post)' },
    { title: 'URL Patterns', desc: 'URL routing definition.', author: 'router_man', trending: false, code: 'from django.urls import path\nfrom . import views\n\nurlpatterns = [\n    path("about/", views.about_view, name="about"),\n]' },
    { title: 'Signal Receiver', desc: 'Listen to model save events.', author: 'signal_listener', trending: false, code: 'from django.db.models.signals import post_save\nfrom django.dispatch import receiver\n\n@receiver(post_save, sender=User)\ndef on_save(sender, instance, **kwargs):\n    pass' }
  ]},
  { id: 'rust', name: 'Rust', icon: 'devicon-rust-plain', color: 'bg-[#dea584]', textColor: 'text-black', snippets: [
    { title: 'Read File String', desc: 'Handle file IO with Result.', author: 'rustacean', trending: true, code: 'use std::fs;\n\nfn read_file() -> Result<String, std::io::Error> {\n    let contents = fs::read_to_string("foo.txt")?;\n    Ok(contents)\n}' },
    { title: 'Derive Deserialize', desc: 'Serde JSON parsing.', author: 'serde_fan', trending: false, code: 'use serde::Deserialize;\n\n#[derive(Deserialize, Debug)]\nstruct User { id: u32 }' },
    { title: 'Spawn Thread', desc: 'Create OS thread.', author: 'concurrency', trending: false, code: 'use std::thread;\n\nlet handle = thread::spawn(|| {\n    println!("Hello from thread");\n});\nhandle.join().unwrap();' },
    { title: 'HashMap Usage', desc: 'Standard map operations.', author: 'hash_master', trending: false, code: 'use std::collections::HashMap;\nlet mut map = HashMap::new();\nmap.insert("key", "value");' },
    { title: 'Tokio Main', desc: 'Async runtime setup.', author: 'tokio_drift', trending: false, code: '#[tokio::main]\nasync fn main() {\n    println!("Async world");\n}' },
    { title: 'Trait Definition', desc: 'Defining interface.', author: 'trait_guru', trending: false, code: 'trait Printable {\n    fn print(&self);\n}' },
    { title: 'Match Option', desc: 'Handle Some and None.', author: 'match_maker', trending: false, code: 'match opt {\n    Some(val) => println!("{}", val),\n    None => println!("Empty"),\n}' },
    { title: 'Vector Macro', desc: 'Initialize vector easily.', author: 'vec_man', trending: false, code: 'let v = vec![1, 2, 3];' }
  ]},
  { id: 'go', name: 'Go', icon: 'devicon-go-plain', color: 'bg-[#00add8]', textColor: 'text-black', snippets: [
    { title: 'HTTP Handler', desc: 'Basic net/http web server.', author: 'gopher99', trending: true, code: 'http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {\n    fmt.Fprintf(w, "Hello, World")\n})\nhttp.ListenAndServe(":8080", nil)' },
    { title: 'Worker Pool', desc: 'Basic channel concurrency.', author: 'channel_surfer', trending: false, code: 'func worker(jobs <-chan int, results chan<- int) {\n    for j := range jobs {\n        results <- j * 2\n    }\n}' },
    { title: 'JSON Marshal', desc: 'Serialize struct to JSON.', author: 'json_go', trending: false, code: 'b, err := json.Marshal(myStruct)\nif err != nil { panic(err) }' },
    { title: 'Read File', desc: 'Read entire file.', author: 'io_go', trending: false, code: 'data, err := os.ReadFile("file.txt")\nif err != nil { panic(err) }' },
    { title: 'Execute Command', desc: 'Run OS command.', author: 'cmd_runner', trending: false, code: 'out, err := exec.Command("ls", "-l").Output()' },
    { title: 'Error Check', desc: 'Standard idiom.', author: 'err_nil', trending: false, code: 'if err != nil {\n    return fmt.Errorf("failed: %w", err)\n}' },
    { title: 'Regex Find', desc: 'Compile and extract.', author: 'regex_go', trending: false, code: 're := regexp.MustCompile(`a.c`)\nres := re.FindString("abc")' },
    { title: 'Defer Panic Recover', desc: 'Catch panics.', author: 'recover_pro', trending: false, code: 'defer func() {\n    if r := recover(); r != nil {\n        fmt.Println("Recovered", r)\n    }\n}()' }
  ]},
  { id: 'php', name: 'PHP', icon: 'devicon-php-plain', color: 'bg-[#777bb4]', textColor: 'text-white', snippets: [
    { title: 'PDO Connection', desc: 'Secure database connection.', author: 'php_veteran', trending: true, code: '$pdo = new PDO("mysql:host=local;dbname=test", "usr", "pwd");\n$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);' },
    { title: 'Read JSON Post', desc: 'Parse incoming JSON.', author: 'api_php', trending: false, code: '$json = file_get_contents(\'php://input\');\n$data = json_decode($json, true);' },
    { title: 'Array Map', desc: 'Transform array elements.', author: 'array_guy', trending: false, code: '$res = array_map(fn($x) => $x * 2, $arr);' },
    { title: 'Class Constructor', desc: 'PHP 8 promoted properties.', author: 'modern_php', trending: false, code: 'class User {\n    public function __construct(\n        public string $name,\n    ) {}\n}' },
    { title: 'Try Catch', desc: 'Exception handling.', author: 'safe_php', trending: false, code: 'try {\n    throw new Exception("Err");\n} catch (Exception $e) {\n    echo $e->getMessage();\n}' },
    { title: 'Curl Request', desc: 'Make HTTP GET request.', author: 'curl_master', trending: false, code: '$ch = curl_init("http://api.com");\ncurl_setopt($ch, CURLOPT_RETURNTRANSFER, true);\n$res = curl_exec($ch);' },
    { title: 'File Upload', desc: 'Move uploaded file securely.', author: 'upload_man', trending: false, code: 'move_uploaded_file($_FILES["img"]["tmp_name"], "uploads/img.jpg");' },
    { title: 'String Replace', desc: 'Replace substring.', author: 'str_replace', trending: false, code: '$str = str_replace("old", "new", $str);' }
  ]},
  { id: 'ruby', name: 'Ruby', icon: 'devicon-ruby-plain', color: 'bg-[#cc342d]', textColor: 'text-white', snippets: [
    { title: 'Read File', desc: 'Read file line by line.', author: 'ruby_ist', trending: true, code: 'File.readlines("file.txt").each do |line|\n  puts line\nend' },
    { title: 'Map Array', desc: 'Transform array.', author: 'enumerable_fan', trending: false, code: 'res = arr.map { |x| x * 2 }' },
    { title: 'Hash Default', desc: 'Hash with default value.', author: 'hash_pro', trending: false, code: 'h = Hash.new(0)\nh[:missing] += 1' },
    { title: 'Class Definition', desc: 'Basic Ruby class.', author: 'oo_ruby', trending: false, code: 'class User\n  attr_accessor :name\n  def initialize(name)\n    @name = name\n  end\nend' },
    { title: 'Parse JSON', desc: 'JSON module usage.', author: 'json_ruby', trending: false, code: 'require "json"\ndata = JSON.parse(str)' },
    { title: 'HTTP Get', desc: 'Net::HTTP standard library.', author: 'net_ruby', trending: false, code: 'require "net/http"\nuri = URI("http://api.com")\nres = Net::HTTP.get(uri)' },
    { title: 'Regex Match', desc: 'Match string with regex.', author: 'match_ruby', trending: false, code: 'if "hello" =~ /ll/\n  puts "Match!"\nend' },
    { title: 'Rescue Exception', desc: 'Catch standard errors.', author: 'rescue_me', trending: false, code: 'begin\n  1 / 0\nrescue ZeroDivisionError => e\n  puts e.message\nend' }
  ]},
  { id: 'swift', name: 'Swift', icon: 'devicon-swift-plain', color: 'bg-[#f05138]', textColor: 'text-white', snippets: [
    { title: 'URLSession Request', desc: 'Basic async network request.', author: 'ios_dev', trending: true, code: 'let (data, _) = try await URLSession.shared.data(from: url)\nlet decoded = try JSONDecoder().decode(Model.self, from: data)' },
    { title: 'SwiftUI View', desc: 'Basic UI structure.', author: 'ui_swift', trending: false, code: 'struct ContentView: View {\n    var body: some View {\n        Text("Hello")\n    }\n}' },
    { title: 'Codable Struct', desc: 'JSON parsing model.', author: 'model_swift', trending: false, code: 'struct User: Codable {\n    let id: Int\n    let name: String\n}' },
    { title: 'Guard Let', desc: 'Early return pattern.', author: 'safe_swift', trending: false, code: 'guard let name = optionalName else {\n    return\n}' },
    { title: 'Closure Map', desc: 'Transform array.', author: 'func_swift', trending: false, code: 'let doubled = nums.map { $0 * 2 }' },
    { title: 'DispatchQueue', desc: 'Run on main thread.', author: 'thread_swift', trending: false, code: 'DispatchQueue.main.async {\n    self.updateUI()\n}' },
    { title: 'Extension', desc: 'Add functionality.', author: 'ext_swift', trending: false, code: 'extension String {\n    var isNotEmpty: Bool { !isEmpty }\n}' },
    { title: 'Observable Object', desc: 'State management class.', author: 'state_swift', trending: false, code: 'class Store: ObservableObject {\n    @Published var count = 0\n}' }
  ]},
  { id: 'kotlin', name: 'Kotlin', icon: 'devicon-kotlin-plain', color: 'bg-[#7f52ff]', textColor: 'text-white', snippets: [
    { title: 'Coroutine Launch', desc: 'Start a background task.', author: 'android_dev', trending: true, code: 'GlobalScope.launch(Dispatchers.IO) {\n    val result = fetchData()\n    withContext(Dispatchers.Main) {\n        updateUI(result)\n    }\n}' },
    { title: 'Data Class', desc: 'Immutable data holder.', author: 'data_kotlin', trending: false, code: 'data class User(val id: Int, val name: String)' },
    { title: 'Let Binding', desc: 'Null safety scoping.', author: 'safe_kotlin', trending: false, code: 'optional?.let {\n    println(it)\n}' },
    { title: 'Collection Filter', desc: 'Filter and map.', author: 'collection_kt', trending: false, code: 'val res = list.filter { it > 0 }.map { it * 2 }' },
    { title: 'Companion Object', desc: 'Static-like members.', author: 'object_kt', trending: false, code: 'class MyClass {\n    companion object {\n        const val CONST = "value"\n    }\n}' },
    { title: 'Extension Function', desc: 'Add method to class.', author: 'ext_kt', trending: false, code: 'fun String.removeSpaces() = this.replace(" ", "")' },
    { title: 'When Statement', desc: 'Pattern matching.', author: 'when_kt', trending: false, code: 'when (x) {\n    1 -> print("one")\n    else -> print("other")\n}' },
    { title: 'Lazy Init', desc: 'Initialize on first access.', author: 'lazy_kt', trending: false, code: 'val client by lazy { HttpClient() }' }
  ]},
  { id: 'dart', name: 'Dart', icon: 'devicon-dart-plain', color: 'bg-[#0175c2]', textColor: 'text-white', snippets: [
    { title: 'Future Await', desc: 'Handle async operations.', author: 'flutter_fan', trending: true, code: 'Future<void> fetch() async {\n  var data = await apiCall();\n  print(data);\n}' },
    { title: 'StatelessWidget', desc: 'Flutter UI component.', author: 'ui_dart', trending: false, code: 'class MyWidget extends StatelessWidget {\n  @override\n  Widget build(BuildContext context) {\n    return Text("Hello");\n  }\n}' },
    { title: 'JSON Parse', desc: 'Decode JSON string.', author: 'json_dart', trending: false, code: 'var data = jsonDecode(jsonString);' },
    { title: 'List Map', desc: 'Transform elements.', author: 'list_dart', trending: false, code: 'var mapped = list.map((e) => e * 2).toList();' },
    { title: 'Factory Constructor', desc: 'JSON to Object.', author: 'model_dart', trending: false, code: 'factory User.fromJson(Map<String, dynamic> json) {\n  return User(id: json["id"]);\n}' },
    { title: 'Try Catch', desc: 'Error handling.', author: 'safe_dart', trending: false, code: 'try {\n  throw Exception("Err");\n} catch (e) {\n  print(e);\n}' },
    { title: 'Timer Periodic', desc: 'Execute on interval.', author: 'timer_dart', trending: false, code: 'Timer.periodic(Duration(seconds: 1), (t) {\n  print("Tick");\n});' },
    { title: 'Null Aware', desc: 'Default value fallback.', author: 'null_dart', trending: false, code: 'var name = nullableName ?? "Default";' }
  ]},
  { id: 'vue', name: 'Vue', icon: 'devicon-vuejs-plain', color: 'bg-[#41b883]', textColor: 'text-black', snippets: [
    { title: 'Composition API', desc: 'Basic Vue 3 script setup.', author: 'vue_ninja', trending: true, code: '<script setup>\nimport { ref } from "vue";\nconst count = ref(0);\n<\\/script>\n<template>\n  <button @click="count++">{{ count }}</button>\n</template>' },
    { title: 'Computed Prop', desc: 'Derived reactive state.', author: 'reactive_vue', trending: false, code: 'const double = computed(() => count.value * 2);' },
    { title: 'Watch Effect', desc: 'React to state changes.', author: 'watcher_vue', trending: false, code: 'watch(count, (newVal) => {\n  console.log(newVal);\n});' },
    { title: 'Emit Event', desc: 'Component communication.', author: 'emit_vue', trending: false, code: 'const emit = defineEmits(["update"]);\nemit("update", val);' },
    { title: 'Provide Inject', desc: 'Dependency injection.', author: 'inject_vue', trending: false, code: 'provide("key", value);\nconst injected = inject("key");' },
    { title: 'Router Push', desc: 'Programmatic navigation.', author: 'router_vue', trending: false, code: 'const router = useRouter();\nrouter.push("/home");' },
    { title: 'V-For List', desc: 'Render array in template.', author: 'list_vue', trending: false, code: '<li v-for="item in items" :key="item.id">\n  {{ item.name }}\n</li>' },
    { title: 'OnMounted', desc: 'Lifecycle hook.', author: 'mount_vue', trending: false, code: 'onMounted(() => {\n  console.log("Mounted!");\n});' }
  ]},
  { id: 'docker', name: 'Docker', icon: 'devicon-docker-plain', color: 'bg-[#2496ed]', textColor: 'text-white', snippets: [
    { title: 'Node.js Dockerfile', desc: 'Multi-stage build for Node.', author: 'devops_guy', trending: true, code: 'FROM node:18-alpine AS build\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nRUN npm run build\n\nFROM nginx:alpine\nCOPY --from=build /app/dist /usr/share/nginx/html' },
    { title: 'Python Dockerfile', desc: 'Standard python setup.', author: 'py_docker', trending: false, code: 'FROM python:3.9-slim\nWORKDIR /app\nCOPY reqs.txt .\nRUN pip install -r reqs.txt\nCOPY . .\nCMD ["python", "main.py"]' },
    { title: 'Docker Compose', desc: 'Web and DB stack.', author: 'compose_pro', trending: false, code: 'version: "3"\nservices:\n  web:\n    build: .\n    ports: ["80:80"]\n  db:\n    image: postgres\n    environment:\n      POSTGRES_PASSWORD: pass' },
    { title: 'Go Builder', desc: 'Multi-stage go compilation.', author: 'go_docker', trending: false, code: 'FROM golang:1.20 AS builder\nWORKDIR /app\nCOPY . .\nRUN go build -o main .\nFROM scratch\nCOPY --from=builder /app/main /main\nENTRYPOINT ["/main"]' },
    { title: 'Docker Ignore', desc: 'Common ignore file.', author: 'ignore_man', trending: false, code: 'node_modules\n.git\nDockerfile\n.dockerignore' },
    { title: 'Bind Mount', desc: 'Docker run command.', author: 'run_cmd', trending: false, code: 'docker run -v $(pwd):/app -p 8080:80 my-image' },
    { title: 'Network Create', desc: 'Custom bridge network.', author: 'net_docker', trending: false, code: 'docker network create my-net' },
    { title: 'Prune All', desc: 'Clean up system.', author: 'clean_docker', trending: false, code: 'docker system prune -a --volumes' }
  ]}
];
