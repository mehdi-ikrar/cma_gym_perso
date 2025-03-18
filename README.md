# ```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```



<div class="news-carousel-container">
<h3 class="section-heading">Dernières actualités</h3>

<div class="news-carousel">
    <div class="carousel-track">
        <% actualities.slice(0, 3).forEach((actuality, index) => { %>
            <div class="carousel-slide <%= index === 0 ? 'active' : '' %>" data-index="<%= index %>">
                <div class="carousel-content vertical">
                    <div class="carousel-image">
                        <img src="<%= actuality.image %>" alt="<%= actuality.title %>">
                    </div>
                    <div class="carousel-text">
                        <h3><%= actuality.title %></h3>
                        <p class="carousel-description"><%= actuality.description %></p>
                        <div class="carousel-footer">
                            <p class="carousel-date"><%= new Date(actuality.createdAt).toLocaleDateString() %></p>
                            <a href="/actuality/<%= actuality.id %>" class="carousel-button">Lire la suite</a>
                        </div>
                    </div>
                </div>
            </div>
        <% }); %>
    </div>
    
    <!-- Navigation du carrousel -->
    <button class="carousel-nav carousel-prev" aria-label="Précédent">
        <i class="fas fa-chevron-left"></i>
    </button>
    <button class="carousel-nav carousel-next" aria-label="Suivant">
        <i class="fas fa-chevron-right"></i>
    </button>
    
    <!-- Indicateurs de pagination -->
    <div class="carousel-indicators">
        <% actualities.slice(0, 3).forEach((actuality, index) => { %>
            <button class="carousel-indicator <%= index === 0 ? 'active' : '' %>" data-index="<%= index %>" aria-label="Slide <%= index + 1 %>"></button>
        <% }); %>
    </div>
</div>
</div>