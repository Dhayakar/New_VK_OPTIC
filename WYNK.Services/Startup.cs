using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using WYNK.Data.Model;
using WYNK.Data.Repository;
using WYNK.Data.Repository.Implementation;


namespace WYNK.Services
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        string Connectionline = "";
        public string btnConnection_Click(string path)
        {            
            StreamReader sr = new StreamReader(path);
            String line = sr.ReadToEnd();
            Connectionline = line;
            return Connectionline;
        } 

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // var mainstring = btnConnection_Click(Configuration.GetConnectionString("D:\\NEW_WYNKEMR_UI\\WYNK.Services\\Connectionstring\\MainConnection\\Mainstring.txt"));       
            //string[] linestring;
            //var list = new List<string>();
            //var osfn = "1062";
            //var osfi = "/Connectionstring/MainConnection/";
            //var currentDir = Directory.GetCurrentDirectory();
            //string path = currentDir + osfi + osfn;

            //if (File.Exists(path))
            //{
            //    var fileStream = new FileStream(path, FileMode.Open, FileAccess.Read);
            //    using (var streamReader = new StreamReader(fileStream, Encoding.UTF8))
            //    {
            //        string line;
            //        while ((line = streamReader.ReadLine()) != null)
            //        {
            //            list.Add(line);
            //        }
            //    }
            //    linestring = list.ToArray();
            //}

            var conString = Configuration.GetConnectionString("WYNKContext");
            var emrConString = Configuration.GetConnectionString("CMPSContext");
            


            //var conString = btnConnection_Click(Configuration.GetConnectionString("WYNKContext"));
            //var emrConString = btnConnection_Click(Configuration.GetConnectionString("CMPSContext"));
            //var PayrollConstring = btnConnection_Click(Configuration.GetConnectionString("PAYROLLContext"));
            //var OpticalConnectionstring = btnConnection_Click(Configuration.GetConnectionString("OpticalContext"));

            services.AddCors(x => { x.AddPolicy("AllowAll", y => y.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin().AllowCredentials().Build()); });
           // services.AddDbContext<MainContext>(Options => Options.UseSqlServer(mainstring));

            services.AddDbContext<WYNKContext>(Options => Options.UseSqlServer(conString));
            services.AddDbContext<CMPSContext>(Options => Options.UseSqlServer(emrConString));
           

            services.AddScoped<IRepositoryWrapper, RepositoryWrapper>();
            services.AddMvc().AddJsonOptions(x =>
            {
                x.SerializerSettings.ContractResolver = new DefaultContractResolver();
                x.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            });
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
     .AddJwtBearer(options =>
     {
         options.TokenValidationParameters = new TokenValidationParameters
         {
             ValidateIssuer = true,
             ValidateAudience = true,
             ValidateLifetime = true,
             ValidateIssuerSigningKey = true,
             ValidIssuer = Configuration["Jwt:Issuer"],
             ValidAudience = Configuration["Jwt:Issuer"],
             IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
         };
     });
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
 
       
            app.UseAuthentication();
            app.UseCors("AllowAll");

            app.UseMvc();
        }
    }
}