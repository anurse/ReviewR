// <auto-generated />
namespace ReviewR.Web.Migrations
{
    using System.Data.Entity.Migrations;
    using System.Data.Entity.Migrations.Infrastructure;
    
    public sealed partial class AddDatesToReviewAndIteration : IMigrationMetadata
    {
        string IMigrationMetadata.Id
        {
            get { return "201204080511297_AddDatesToReviewAndIteration"; }
        }
        
        string IMigrationMetadata.Source
        {
            get { return null; }
        }
        
        string IMigrationMetadata.Target
        {
            get { return "H4sIAAAAAAAEAO1dWW/kNhJ+X2D/Q0NPmwXitj0TIBm0Ezg+AmPjA25P8mjQLXabiER1JLbH/m37sD9p/0JInbxFna0x8mbzKBaLX5GsEqv6///93+Kn1zCYvcA4QRE+8Y4ODr0ZxKvIR3hz4u3I+tvvvZ9+/Oc/Fhd++Dr7rWj3gbWjPXFy4j0Tsv00nyerZxiC5CBEqzhKojU5WEXhHPjR/Pjw8If50dEcUhIepTWbLe53mKAQpv/Qf88ivIJbsgPBdeTDIMnLac0ypTq7ASFMtmAFT7x7+ILgl/uD3+HTQdb64BwQ4M1OAwQoO0sYrL3Z9uOnzwlckjjCm+UWEASCh7ctpPVrECQwZ/7T9qMr/4fHjP85wDgilFyEW83fK2dG53ZBZUDeGFvp/OjUogDyLWib/8A3oYAW3cXRFsbk7R6u835Xvjebi/3mcseyG9eHDU3/wuTDsTe72QUBeApgKSEqwiWJYvgLxDAGBPp3gBAYY9YXpqwro0pjsPmwv4qR6HJQWHmzS/QK/V8h3pDncrRr8FqUHH/3nTf7jBFFIe1E4h3UcCeNfANe0CZdF4kHioI48Wb3MEhrk2e0zTBywGoeGYu0+jKOQvZn1j4rfXwA8QYSynykVC2jXbySuFjMqwW1LjOj856W+SIEKBhhjaVh70CSfIliv9eRs//dBl6CgIw++DlKtgF427da5XrTRq0K3dGoVaFxzlykZ4Gej6zu8SyGgMKb50WsUdRcqtapuo2nOxATtEJbgIlFQGIrSU58pV5cQgud1Jw3o2y272k7YgKqH8dOo4V60T+7qjZMVjHaZpeLkcdO0Q7923JkeqeCD/SKdrteJwxcrXeKUgG76KisBAYV7k1HuQaPuYZwzKm1yiaiadJ0I7kiTAEYX1oWy2oNg3Kdwp7SoNOFhpvse9pIMtF03Ur62I7u4Z87FMOSys8RXUWAG9NZUtNll5Sbi4T0orb9pSAHYh8KJWu8ReeamAJ9nMha"
                       + "u0B7ZrfSplI3/9alKZ2QVDviYU5Ii9o02uRllTGeAq6MXSLTJZ/VnD0DvIGPFVw53nT1it5oG3VSnYrie9KdUjhd1YeJp3fD0UV3buCXvY2d4YENKpx7FVSyqqY7EVqvh9+C6u+G/WmnvHtYVdj58h+FITRdsvPKRzYSzx5frmwaQmWnzSKn9J52CiaUKdxXmXb8ijC8wj58NZJy0t4IE7ZIY5/2d1GiPew7eqKtepA1UPUgvV/K6ilUtjnY26ukiRVBX91UchfqzcjCFLlKLgOwqb7afKaAioM3igEeU+Ksr2H4BOPi5IlIfnHzZr+BYEeLDhU5CT2yu1KKsrzDkb3Dlc9klbc9trf9HSDCk/5gb75EG0xRyI6avMNHVbKZDC1ylY+6zkI99X13eV5HPlojrn2NOO9hGL1wzY9dZnyaJNEKpWjmtC13Q4uDXWB/ZvZJVxeETBuvdwFB24DCkrydeP9WWNdSK8+silr6ac9ObTHnZmGfnOQ3M7FkcqJxbOVWhfs0Tc5zu+COPPlQvcXnMIAEzk5XJP2kfAaSFfDV/ZSuty+W0HMYxuxABAE9HhISA4SJemgjzPaSwMq31MvxsGdclfTlmnO4hZid19ZFcBm4OInVwcsxJFHVSaYBxDQOGxMkbN4braOpCd5svtY6HO8fdWbuR0CeeV1cBq88NnvBn+L5MAHE7Aap4MFZQe7IMzvRp487E+8joM60Hl8B5rR2swkediNa52hoAj67A80B2fvHoG0KI+DQtj5Ow/Net73AUbALTUDRG4kVQAovRwPsaU3LyV/wdFyPADOd/Cd/uRPM/DoYiDZ/L8gSPXsue+V08MXzPiK++FVwGbZwBe4FX+oHVavVrH/vVLfh1Jji+k+2Le2RVogxzm0E2BhFMLG9KXMMMi8v7SH54O7Pn1L376vso886LSERHyNWTkbB6aLAROycPxBWOmegq+lcPkBUx84tgxoC4qsDhYoA0hpS/HshhRB3T6wh"
                       + "k+2/Ohr87lxHpPzuo1Apjw2JBAcQcXGKx6RcA/WpqYxUq5ev5LZcfQXpVr8e1z/nTT5yxMk4TFR+CadO1ubzc/H68UwXqLVM2+DnqxNdi6nrngap06/zR7l6pLgJiLpnkYXFB1Uv1RYSUV99qPKw+0fcPCQc8/zmYZGE0ScyiBz037FVWdTb7e6WOzeRcie0CMRqpzvJt4VcxA+GqjzMhmO96cjPv9zELQLQGosD7BLil0nznFWTpt6oaTtnwYypB06LWWteJhqOQfNt2/G+3fxQ1N6wHfdXiyyKr8XlpbCsW8yzcMC8YDE3xA0ursF2i/CGiyPMS2bLLIjw7Ntl8/i9MKMxXwkClq+w5Uj02AQbKNUy8PjwEsUJYVGLT4B9gD3zQ6WZ6xW4GI6/CavrVtzBitbsb+GqLYdTHqixiLwcL+nUmAqks4TSfUjtNmOBnCAAseZNzFkU7EJsNnrMvavwQp5GVapSWswl/hUDRxGV4ksQ5e60Kpk+9bEquh3dYVX03YZZlTwakCeQF7nTqEL7eDJVaXNKWayejlpW405RCMDjCQoVk8FecRvrZU/Q3jRddgVDx2EQWLgveAoml4aZirrAppU1IoV/rS4gha9wp8fFaPHUuOLJoK7mNtIcesYQo5RiHf6svQc6nMpPmcLhZPzAaabUD5yrECKRn6LUnVLxNo+nU5RNBoCcvdUH/IxmpQP4LH2nDr2+dzAuhkZCTzy1Hayw4fpAjyksxQk+ts7D4Ef48i2QsX0SN9OrQj94YlVpgzOZjyMRjma+osGJyr2KFY5UrrzJzZA91BWvhKxkOpgunBt9gFobPpFSq0O0secwcC6+hMrg28cpLAVGyFjhqhqAuAiREBBcFDYwlcqQB8FMKkvHh7HoIlJt6uLLkJvdXLTWGcc6twVzd2lAIH5LUmXihOCUkP4TKzdqI4aM33edGGI0GjIku/DUJVQ8eXKTEkClR0/y3C1yL1p9WjDFrZY18WaU9xfk"
                       + "M5fa8o1COcwAsfwzOAtQqiFFg2uA0Rom5CH6A+IT7/jw8HspqViLhF/zJPGDKWb9QmzqteFmTfMUSAm/8AuIV88gVkM6rYQnnklrENEJSbRayk2lKufIciHcNgVWX7Q1Ga6GxtG+kiANgiQxgDMdokP2o0L0/wrB6zc9ZDTqRE/JUuTTf1kiycglB8PXkc9mmI1ZSr/RBhXdcSWnsXlCzWmIKWzqufga0q5Mdsn71l8lh8ow+rvPNCCDrKUmA0ib5ZRzcPR1YmvSe/RFWs3e0QrHXLaOBgCefiqJQdAmZpHYz1GhzSAhEWqRP6LT7iXnhCg2rz6tmbbGoNmhoImy09v69bgrB+lwBSjG7np+tw6Kzx7NjRnOJD+qbRWB3zoCYbwY96nFFnQKandeqoGgIrz8HzVspcFi9heg/jWEBzeLauoUwbS/1R9ry2i69nvdN5yTEex71+CeybdLfzDxHcP2DmNy+0WjdAINV24g/PAhXi1zGHTLVzFuZoD3lAhgn/faMqavTXj4pI8p8yuHiR1RTiH9jdX73eClqc6Ph5r9B+qbHzRMZHspHSPy+A5Z9aa+wZhenzT08owMFt1jE/4aLC+WbqHeEVicF3BMsFie9IyUxkENdZMXTc3jYEzjkL3nOfH8p4gubeYv1Effy2SznUohmxXryOpjVhVuc8NO5Tev0HJsCI6WiQuGvjKCUKsbxhp6KY/FGRnKSFydbhxLWLM8Cn/JUIbhK3XjVPX1A5UXCWWUskY3hCnyVwsnA1KrKhOs9IgdOiUErwFVQKAtwFcENx/E1T2oeYCED87smr1shnCh7tMdJIa72WqOM9Ge01a0W1NlM5NicLpPc6CsFA0ZN9p1+tCR7tPuKelEc/BK+7kQQtDftDrmlWi8AiNOUZMByZZLyfC0vdMaymem+PC+1ykWiSisU9Q/llcsGH7r0TA6yBQbpL9QH8fTKzz3y9rUfkjYLwgUJNjvbGO4Ei7vZZsrvI4KI0Li"
                       + "qGgifcu/hgT49GZ/Sg+RNVgRWr2CScL/vsFF+AT9K3y7I9sdoVOG4VMg/IoJs0Vs46c5PkSeF7fpg7SkjylQNhF7xnGLf96hoPrRgUvNQwQDCWbk5I9v2FoS9ghn81ZSuomwI6FcfKVt9gDDbUCJJbd4CV6gmbd6GYoSW5wjsIlBmOQ0qv70Xwo/P3z98S9+C+t2G34AAA=="; }
        }
    }
}
