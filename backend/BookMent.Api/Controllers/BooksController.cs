using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
    private readonly ApplicationDbContext _db;
    public BooksController(ApplicationDbContext db) { _db = db; }

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] string? search = "")
    {
        var q = _db.Books.AsQueryable();
        if (!string.IsNullOrWhiteSpace(search))
            q = q.Where(b => b.Title.Contains(search) || (b.Author ?? "").Contains(search) || (b.ISBN ?? "").Contains(search));
        var list = await q.OrderByDescending(b => b.CreatedAt).ToListAsync();
        return Ok(list);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var book = await _db.Books.FindAsync(id);
        if (book == null) return NotFound();
        return Ok(book);
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Book dto)
    {
        dto.CreatedAt = DateTime.UtcNow;
        if (dto.CopiesAvailable <= 0) dto.CopiesAvailable = dto.TotalCopies <= 0 ? 1 : dto.TotalCopies;
        _db.Books.Add(dto);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = dto.Id }, dto);
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] Book dto)
    {
        var book = await _db.Books.FindAsync(id);
        if (book == null) return NotFound();
        book.Title = dto.Title;
        book.Author = dto.Author;
        book.ISBN = dto.ISBN;
        book.Genre = dto.Genre;
        book.Year = dto.Year;
        book.Description = dto.Description;
        book.TotalCopies = dto.TotalCopies;
        book.CopiesAvailable = dto.CopiesAvailable;
        await _db.SaveChangesAsync();
        return NoContent();
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var book = await _db.Books.FindAsync(id);
        if (book == null) return NotFound();
        _db.Books.Remove(book);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
